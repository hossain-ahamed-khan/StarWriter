import Image from "next/image"
import { BsStars } from "react-icons/bs";

export const Hero = () => {
    return (
        <div>
            <p>Study Smarter, Not Harder</p>
            <div>
                <h1>The Original <span>Humanizer</span></h1>
                <Image
                    src="/profile.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>
            <div>
                <h1>That Writes Like You</h1>
                <Image
                    src="/profile.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>
            <p>Level Up Your Writing with Undetectable AI Text and High-Quality Grammar — Built for High Grades.</p>
            <div>
                <Image
                    src="/profile.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
                <p>Cheaper Than Coffee, Smarter Than Your Professor!</p>
            </div>
            <div>
                <button><BsStars />Try Me, I'm Free</button>
            </div>
        </div>
    )
}
