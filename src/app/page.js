'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

const VideoIntro = ({ onClose }) => {
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100]">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full z-[101]"
      >
        <X size={24} />
      </button>
      <video 
        ref={videoRef}
        autoPlay 
        onEnded={onClose}
        className="w-screen h-screen object-cover"
        playsInline
        muted
      >
        <source src="https://i.imgur.com/V0qPywB.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(true);
  const router = useRouter();

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="space-y-8">
      {showVideo && <VideoIntro onClose={handleVideoEnd} />}
      
      {/* Hero Section */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white-800 mb-6">
          歡迎來到 BLACK SAFARI
        </h1>
        {/* <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          探索運動與社交的無限可能。我們提供專業的運動課程、社交活動和品牌合作機會，
          讓每位參與者都能在這裡找到屬於自己的精彩時刻。
        </p> */}
      </div>
      
      {/* 功能卡片 */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">最新活動</h2>
          <p className="text-gray-600 mb-6">
            即將舉辦的精彩活動和課程資訊，不容錯過的運動社交體驗。
          </p>
          <button 
            onClick={() => router.push('/activities/events')}
            className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            查看更多
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Title</h2>
          <p className="text-gray-600 mb-6">
            立即加入我們的專業運動課程，開啟您的健康生活方式。
          </p>
          <button 
            onClick={() => router.push('/activities/intro')}
            className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            立即報名
          </button>
        </div>
      </div>

      {/* 聯絡資訊 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">聯絡我們</h3>
            <p className="text-gray-600">電話：(02) 2345-6789</p>
            <p className="text-gray-600">Email：contact@blacksafari.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">追蹤我們</h3>
            <p className="text-gray-600">Instagram: @blacksafari.tw</p>
          </div>
        </div>
      </div>
    </div>
  );
}