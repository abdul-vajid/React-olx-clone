import React, { useState, useEffect } from 'react';

const Loading = () => {
    const [dot, setDot] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setDot((prev) => prev.length < 3 ? prev + '.' : '');
        }, 500);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="alert alert-secondary" role="alert">
            Please wait{dot}
        </div>
    );
};

export default Loading;
