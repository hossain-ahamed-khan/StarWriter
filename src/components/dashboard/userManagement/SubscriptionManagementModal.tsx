'use client';

import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImCross } from "react-icons/im";
import { Crown } from 'lucide-react';
import ManageSubscription from './ManageSubscription';

export default function SubscriptionManagementModal() {
    const [open, setOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userEmail.trim()) {
            setEmailSubmitted(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setUserEmail('');
        setEmailSubmitted(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="flex gap-2 items-center bg-[#9333EA] hover:bg-[#7E22CE] text-white px-4 py-2 rounded-lg transition-colors">
                <Crown className="w-4 h-4" />
                Manage User Subscription
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-black max-w-2xl max-h-[90vh] overflow-y-auto">
                <AlertDialogHeader>
                    <div className="w-full flex justify-between items-start">
                        <div></div>
                        <AlertDialogTitle className="text-center text-[#0030A8] text-2xl font-bold mt-4">
                            Manage User Subscription
                        </AlertDialogTitle>
                        <AlertDialogCancel 
                            className="text-right hover:bg-gray-100 rounded-full p-2 border-0"
                            onClick={handleClose}
                        >
                            <ImCross />
                        </AlertDialogCancel>
                    </div>
                </AlertDialogHeader>

                <div className="mt-4 space-y-4">
                    {!emailSubmitted ? (
                        // Email Input Form
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Enter user email address"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter the email address of the user whose subscription you want to manage
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!userEmail.trim()}
                                    className="flex-1 px-4 py-2 bg-[#0030A8] hover:bg-[#002080] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Subscription Management Component
                        <>
                            <button
                                onClick={() => setEmailSubmitted(false)}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                ← Change Email
                            </button>
                            <ManageSubscription 
                                userEmail={userEmail}
                                onSuccess={handleClose}
                            />
                        </>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
