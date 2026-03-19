import React, { useEffect, useState } from 'react';
import Aurora from './Aurora';
import SplitText from './SplitText';
import './Splash.css';

const Splash = ({ name, onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Automatically trigger completion after a short delay following animation
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for fade-out animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`splash-overlay ${!isVisible ? 'fade-out' : ''}`}>
            <Aurora
                colorStops={["#FFFFFF", "#0ea5e9", "#FFFFFF"]} // ⚡ Premium White & SkyBlue
                blend={0.7}
                amplitude={1.6}
                speed={0.4}
            />
            <div className="splash-content">
                <SplitText
                    text={`Hey, ${name}!`}
                    className="splash-text-giant"
                    delay={80}
                    duration={1.2}
                    from={{ opacity: 0, y: 80, filter: 'blur(30px)' }}
                    to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                />
                <div className="splash-subtext animate-fade-in-up">
                    <SplitText 
                        text="Welcome to HMS Pro" 
                        delay={30} 
                        duration={0.8} 
                        from={{ opacity: 0 }} 
                        to={{ opacity: 0.7 }}
                        className="subtext-line"
                    />
                </div>
            </div>
        </div>
    );
};


export default Splash;
