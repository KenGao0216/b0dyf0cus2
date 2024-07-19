import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleMouseEnter = () => {
            const tooltip = tooltipRef.current;
            const icon = document.querySelector('.info-icon-container');
            if (tooltip) {
                const iconRect = icon.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                if (iconRect.right + tooltipRect.width > window.innerWidth) {
                    tooltip.style.left = 'auto';
                    tooltip.style.right = '100%';
                    tooltip.style.transform = 'translateY(-50%)';
                } else {
                    tooltip.style.left = '100%';
                    tooltip.style.right = 'auto';
                    tooltip.style.transform = 'translateY(-50%)';
                }
                
                if (tooltipRect.bottom > window.innerHeight) {
                    tooltip.style.top = 'auto';
                    tooltip.style.bottom = '0';
                } else {
                    tooltip.style.top = '50%';
                    tooltip.style.bottom = 'auto';
                }
            }
        };

        const iconContainer = document.querySelector('.info-icon-container');
        iconContainer.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            iconContainer.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <nav className="navbar">
            <h1>B0dyF0cus</h1>
            <div className="info-icon-container">
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                <div className="tooltip-message" ref={tooltipRef}>
                    Customize your workout and see what muscle groups  
                    are being worked out! Add your own workout and see
                    if today is arm or leg day!
                </div>
            </div>
        </nav>
    );
}