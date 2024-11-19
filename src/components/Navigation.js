'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenuId, setExpandedMenuId] = useState(null);

  // 監聽視窗大小變化
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (typeof window !== 'undefined') {
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  const menuItems = [
    {
      id: 1,
      title: '活動介紹',
      subItems: [
        { id: 1, title: '介紹內容', path: '/activities/intro/content' }
      ]
    },
    {
      id: 2,
      title: '開辦日期',
      subItems: [
        { id: 1, title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/dates/evolution' }
      ]
    },
    {
      id: 3,
      title: '精彩活動回顧',
      subItems: [
        { id: 1, title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/events/origin' },
        { id: 2, title: '2024.10.25 台北無心戒酒會的合作活動', path: '/activities/events/collaboration1' },
        { id: 3, title: '2024.10.26 TAIWANIZE 台北國際彩虹文化節', path: '/activities/events/rainbow' },
        { id: 4, title: '2024.10.26 Only Friends合作活動', path: '/activities/events/collaboration2' }
      ]
    },
    {
      id: 4,
      title: 'BLACK SAFARI 的LOGO介紹',
      subItems: [
        { id: 1, title: '2024.5.5 BLACK SAFARI IN ORIGIN', path: '/activities/logo/origin' },
        { id: 2, title: '2024.12.21（SAT）BLACK SAFARI in EVOLUTION', path: '/activities/logo/evolution' }
      ]
    },
    {
      id: 5,
      title: '合作廠商',
      subItems: [
        { id: 1, title: 'TAIWANIZE 品牌服飾', path: '/activities/partners/taiwanize' },
        { id: 2, title: 'BLACK SAFARI & NIKE Collaborative gym wear', path: '/activities/partners/nike' },
        { id: 3, title: 'BLACK SAFARI & Under Armour Collaborative gym wear', path: '/activities/partners/ua' }
      ]
    },
    {
      id: 6,
      title: 'Customer Service',
      path: '/activities/service',
      subItems: []
    }
  ];

  return (
    <>
      {/* 手機版選單按鈕 */}
      {isMobile && (
        <button
          className="fixed top-4 right-4 z-40 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="text-sm">Menu</span>
          <Menu size={20} />
        </button>
      )}

      {/* 側邊選單 */}
      <aside className={`
        ${isMobile ? 'fixed' : 'relative'} 
        w-64 h-screen z-30 backdrop-blur-sm
        ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        transition-transform duration-200 ease-in-out
      `}>
        <div className="p-4 border-b border-white/20">
          <h1 className="text-xl font-bold text-white">BLACK SAFARI</h1>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-64px)] px-2">
          {menuItems.map(item => (
            <div key={item.id}>
              {/* 主選單項目 */}
              <button
                onClick={() => {
                  if (item.subItems?.length > 0) {
                    setExpandedMenuId(expandedMenuId === item.id ? null : item.id);
                  } else if (item.path) {
                    router.push(item.path);
                    if (isMobile) {
                      setIsMobileMenuOpen(false);
                    }
                  }
                }}
                className={`w-full text-left py-2 pl-4 hover:bg-white/10 text-white/90
                  ${pathname.includes(item.path) ? 'bg-white/20 font-bold' : ''}`}
              >
                {item.title}
              </button>

              {/* 子選單項目 */}
              {expandedMenuId === item.id && item.subItems && (
                <div className="bg-black/20">
                  {item.subItems.map(subItem => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        router.push(subItem.path);
                        if (isMobile) {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full text-left py-2 pl-8 hover:bg-white/10 text-white/90 text-sm
                        ${pathname === subItem.path ? 'bg-white/20 font-bold' : ''}`}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navigation;