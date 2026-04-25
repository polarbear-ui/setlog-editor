import React, { useState, useRef } from 'react';
import { Heart, Share2, Upload, User, Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import defaultBg from './default-bg.jpg';

export default function App() {
  // 상태 관리
  const [time, setTime] = useState("12:00");
  const [comment, setComment] = useState("일어남");
  const [profileId, setProfileId] = useState("S2");
  const [bgImage, setBgImage] = useState(defaultBg);
  const [profileImg, setProfileImg] = useState("");
  const [otherProfileImg, setOtherProfileImg] = useState("");
  const [otherComment, setOtherComment] = useState("비행운");

  // 다운로드를 위해 카드 영역을 가리킬 참조 변수
  const cardRef = useRef(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  // ⭐️ 이미지 다운로드 핸들러 (html-to-image 버전)
  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      // html-to-image 라이브러리를 사용해 고화질 캡처
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2, // 화질을 2배로 선명하게
      });
      
      const link = document.createElement("a");
      link.download = "setlog-card.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert("이미지 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- 왼쪽: 에디터 컨트롤러 패널 --- */}
      <div className="w-full md:w-96 bg-white p-6 shadow-xl overflow-y-auto border-r border-slate-200 z-10 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-pink-500">S</span> Setlog Editor
        </h2>

        <div className="space-y-6 flex-1">
          {/* 배경 이미지 업로드 */}
          <section>
            <label className="block text-sm font-semibold mb-2">공유할 사진</label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition">
              <Upload className="w-6 h-6 text-teal-500 mb-2" />
              <span className="text-sm text-slate-500 font-medium">이미지 업로드</span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setBgImage)} />
            </label>
          </section>

          {/* 메인 텍스트 설정 */}
          <section className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">시간</label>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">코멘트</label>
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400 outline-none" />
            </div>
          </section>

          {/* 프로필 정보 */}
          <section className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">계정 ID</label>
              <input type="text" value={profileId} onChange={(e) => setProfileId(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">프로필 이미지</label>
              <label className="block w-full border-2 border-dashed border-slate-300 rounded-md p-2 text-center cursor-pointer hover:bg-slate-50 transition text-sm text-slate-500">
                업로드
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setProfileImg)} />
              </label>
            </div>
          </section>

          <hr className="border-slate-200 my-2" />

          {/* 타인 댓글 설정 */}
          <section>
            <h3 className="text-sm font-bold mb-3 text-slate-800">댓글 달기</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-semibold text-slate-500 mb-1">친구 프로필 사진</label>
                   <label className="block w-full border-2 border-dashed border-slate-300 rounded-md p-2 text-center cursor-pointer hover:bg-slate-50 transition text-sm text-slate-500">
                     Upload
                     <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setOtherProfileImg)} />
                   </label>
                 </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">친구 댓글</label>
                <input type="text" value={otherComment} onChange={(e) => setOtherComment(e.target.value)} className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-teal-400 outline-none" />
              </div>
            </div>
          </section>
        </div>

        {/* ⭐️ 다운로드 버튼 추가 */}
        <div className="pt-6 mt-4 border-t border-slate-200">
          <button 
            onClick={handleDownload}
            style={{ backgroundColor: '#14b8a6' }} // 직접 색상 지정
            className="w-full text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <Download className="w-5 h-5" />
            이미지로 저장
          </button>
        </div>
      </div>

      {/* --- 오른쪽: 라이브 미리보기 --- */}
      <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <p className="text-slate-800 font-bold mb-6 text-xl self-start md:self-center">Live Preview</p>
          
          {/* ✅ ref={cardRef} 추가됨! 이 영역이 캡처됩니다. */}
          <div ref={cardRef} className="relative w-full aspect-[16/10] max-w-[650px] bg-black rounded-[32px] shadow-2xl overflow-hidden group">
            
            {/* 1. 배경 이미지 */}
            <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="preview-bg" />
            
            {/* 2. 오버레이 */}
            <div className="absolute inset-0 bg-black/15" />

            {/* 3. 좌상단 내 프로필 */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden bg-slate-300 shadow-sm border border-white/20">
                {profileImg ? <img src={profileImg} className="w-full h-full object-cover" /> : <User className="w-full h-full p-1 md:p-2 text-white/70" />}
              </div>
              <span className="text-white font-bold text-sm md:text-lg drop-shadow-md tracking-wide">{profileId}</span>
            </div>

            {/* 4. 중앙 시간/코멘트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white select-none pointer-events-none">
             <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] leading-none font-black tracking-tight drop-shadow-xl">{time}</h1>
             <p className="text-sm md:text-xl font-medium mt-1 md:mt-2 drop-shadow-lg opacity-90">{comment}</p>
            </div>

            {/* 5. 우측 하단 아이콘 */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-3 md:gap-5 text-white drop-shadow-md">
             <Share2 className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2.5} />
             <Heart className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2.5} />
            </div>

            {/* 6. 좌하단 타인 댓글 */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-3 pr-12 md:pr-16">
             <div className="w-8 h-8 md:w-10 md:h-10 min-w-[32px] md:min-w-[40px] rounded-full overflow-hidden bg-slate-300 shadow-md border border-white/20">
               {otherProfileImg ? <img src={otherProfileImg} className="w-full h-full object-cover" /> : <User className="w-full h-full p-1.5 md:p-2 text-white/70" />}
            </div>
            <div className="bg-white text-slate-800 px-3 py-1.5 md:px-5 md:py-2.5 rounded-[16px] md:rounded-[24px] font-semibold text-xs md:text-sm shadow-lg truncate max-w-[180px] md:max-w-[300px]">
              {otherComment}
            </div>
           </div>

          </div>
        </div>
      </div>
    </div>
  );
}
