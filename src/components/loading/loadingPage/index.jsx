import React from 'react';

const LoadingPage = ({ loadingUser }) => {
    return (
        // loadingUser is loading in user Admin
        <div className={`bg-[#f3efe8] ${loadingUser ? 'w-[100%] h-[100%]' : 'w-screen h-screen'}`}>
            <div className="loading">
                <span>Loading</span>
            </div>
        </div>
    );
};

export default LoadingPage;
