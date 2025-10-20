'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, Crown, XCircle, AlertTriangle } from 'lucide-react';

interface ManageSubscriptionProps {
    userEmail: string;
    onSuccess?: () => void;
}

interface SubscriptionInfo {
    has_subscription: boolean;
    subscription?: {
        id: number;
        status: string;
        is_active: boolean;
        tier: string;
        term: string;
        is_manual: boolean;
        current_period_end: string;
        canceled_at?: string;
    };
    usage_window?: {
        allow_ai_chat: boolean;
        allow_ai_humanizer: boolean;
        cap_monthly_words: number;
        is_locked: boolean;
    };
}

const ManageSubscription: React.FC<ManageSubscriptionProps> = ({ userEmail, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
    
    // Form states
    const [planKey, setPlanKey] = useState<'pro_monthly' | 'pro_annual'>('pro_monthly');
    const [notes, setNotes] = useState('');
    const [cancelReason, setCancelReason] = useState('');

    const apiUrl = process.env.NEXT_PUBLIC_BASE_API;

    useEffect(() => {
        if (userEmail) {
            fetchSubscriptionInfo();
        }
    }, [userEmail]);

    const getAuthToken = () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('admin_access_token');
    };

    const fetchSubscriptionInfo = async () => {
        setLoading(true);
        try {
            const accessToken = getAuthToken();
            
            if (!accessToken) {
                toast.error('Access token not found. Please login again.');
                return;
            }

            if (!apiUrl) {
                toast.error('API URL is not configured');
                return;
            }

            const response = await fetch(
                `${apiUrl}/admin_dashboard/user-subscription/?email=${encodeURIComponent(userEmail)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    cache: 'no-store',
                }
            );

            if (response.ok) {
                const data = await response.json();
                setSubscriptionInfo(data);
            } else if (response.status === 404) {
                setSubscriptionInfo(null);
            } else {
                setSubscriptionInfo({ has_subscription: false });
            }
        } catch (error: any) {
            console.error('Error fetching subscription info:', error);
            setSubscriptionInfo({ has_subscription: false });
        } finally {
            setLoading(false);
        }
    };

    const handleAssignSubscription = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userEmail) {
            toast.error('User email is required');
            return;
        }

        setSubmitting(true);
        try {
            const accessToken = getAuthToken();
            
            if (!accessToken) {
                toast.error('Access token not found. Please login again.');
                return;
            }

            if (!apiUrl) {
                toast.error('API URL is not configured');
                return;
            }

            const response = await fetch(
                `${apiUrl}/admin_dashboard/assign-subscription/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        user_email: userEmail,
                        plan_key: planKey,
                        notes: notes || `Manually assigned ${planKey} by admin`,
                    }),
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed: ${response.status}`);
            }

            const data = await response.json();
            toast.success(`Successfully assigned ${planKey} to ${userEmail}`);
            setNotes('');
            await fetchSubscriptionInfo();
            onSuccess?.();
        } catch (error: any) {
            console.error('Error assigning subscription:', error);
            
            if (error.message.includes('403')) {
                toast.error('Permission denied. Please check your admin credentials.');
            } else {
                toast.error(error.message || 'Failed to assign subscription');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancelSubscription = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cancelReason.trim()) {
            toast.error('Please provide a reason for cancellation');
            return;
        }

        setSubmitting(true);
        try {
            const accessToken = getAuthToken();
            
            if (!accessToken) {
                toast.error('Access token not found. Please login again.');
                return;
            }

            if (!apiUrl) {
                toast.error('API URL is not configured');
                return;
            }

            const response = await fetch(
                `${apiUrl}/admin_dashboard/cancel-subscription/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        user_email: userEmail,
                        cancel_immediately: true,
                        reason: cancelReason,
                    }),
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed: ${response.status}`);
            }

            const data = await response.json();
            toast.success(`Successfully canceled subscription for ${userEmail}`);
            setCancelReason('');
            await fetchSubscriptionInfo();
            onSuccess?.();
        } catch (error: any) {
            console.error('Error canceling subscription:', error);
            
            if (error.message.includes('403')) {
                toast.error('Permission denied. Please check your admin credentials.');
            } else {
                toast.error(error.message || 'Failed to cancel subscription');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading subscription info...</span>
            </div>
        );
    }

    const hasActiveSubscription = subscriptionInfo?.subscription?.is_active && 
                                  subscriptionInfo?.subscription?.status === 'active';

    return (
        <div className="space-y-6">
            {/* User Email Display */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700">
                    Managing subscription for: <span className="text-blue-600">{userEmail}</span>
                </p>
            </div>

            {/* Current Subscription Status */}
            {subscriptionInfo?.has_subscription && subscriptionInfo.subscription && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        Current Subscription
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="font-medium text-gray-700">Status:</span>
                            <p className={`${hasActiveSubscription ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {subscriptionInfo.subscription.status}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Tier:</span>
                            <p className="capitalize">{subscriptionInfo.subscription.tier}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Term:</span>
                            <p className="capitalize">{subscriptionInfo.subscription.term}</p>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Type:</span>
                            <p className={subscriptionInfo.subscription.is_manual ? 'text-purple-600' : 'text-blue-600'}>
                                {subscriptionInfo.subscription.is_manual ? 'Manual' : 'Stripe'}
                            </p>
                        </div>
                        {subscriptionInfo.subscription.current_period_end && (
                            <div className="col-span-2">
                                <span className="font-medium text-gray-700">Period End:</span>
                                <p>{new Date(subscriptionInfo.subscription.current_period_end).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* No Subscription Message */}
            {subscriptionInfo !== null && !subscriptionInfo.has_subscription && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 text-yellow-800">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="font-medium">No active subscription found for this user</p>
                    </div>
                </div>
            )}

            {/* Assign Subscription Form */}
            <form onSubmit={handleAssignSubscription} className="space-y-4 border border-gray-200 rounded-lg p-4">
                <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        Assign Premium Subscription
                    </h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan
                    </label>
                    <select
                        value={planKey}
                        onChange={(e) => setPlanKey(e.target.value as 'pro_monthly' | 'pro_annual')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="pro_monthly">Pro Monthly</option>
                        <option value="pro_annual">Pro Annual</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional notes about why this was assigned"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Assigning...
                        </>
                    ) : (
                        <>
                            <Crown className="w-4 h-4" />
                            Assign Subscription
                        </>
                    )}
                </button>
            </form>

            {/* Cancel Subscription Form */}
            {hasActiveSubscription && subscriptionInfo?.subscription?.is_manual && (
                <form onSubmit={handleCancelSubscription} className="space-y-4 border border-red-200 rounded-lg p-4 bg-red-50">
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-red-600">
                            <XCircle className="w-5 h-5" />
                            Cancel Subscription
                        </h3>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cancellation Reason <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Reason for cancellation (required)"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                        <p className="text-sm text-red-800 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            This will immediately cancel the subscription and downgrade the user to free tier.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || !cancelReason.trim()}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Canceling...
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4" />
                                Cancel Subscription
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ManageSubscription;
