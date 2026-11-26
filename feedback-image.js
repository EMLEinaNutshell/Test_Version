'use strict';
// Only the public excerpt, faculty and timestamp are accepted by this renderer.
window.EMLEFeedbackImage = async function({text,sections,faculty,timestamp,isUpdate=false}) {
 if(typeof text!=='string'||!text.trim())throw Error('empty');
 await document.fonts.load('15px "IBM Plex Sans Arabic"');
 await document.fonts.load('600 18px "IBM Plex Sans Arabic"');
 const logo=new Image();logo.src='feedback-logo.png';await logo.decode();
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d'),font='"IBM Plex Sans Arabic",Tahoma,sans-serif';
 const setFont=(size,weight=400)=>{ctx.font=`${weight} ${size}px ${font}`};
 function wrap(value,width,size){setFont(size);const lines=[];for(const paragraph of value.replace(/\r\n?/g,'\n').split('\n')){let line='';for(const word of paragraph.split(/(\s+)/u)){if(ctx.measureText(line+word).width<=width){line+=word;continue}if(line.trim()){lines.push(line.trimEnd());line=''}if(ctx.measureText(word).width<=width){line=word.trimStart();continue}for(const {segment} of new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(word)){if(ctx.measureText(line+segment).width>width&&line){lines.push(line);line=''}line+=segment}}lines.push(line.trimEnd())}return lines}
 const groups=Array.isArray(sections)?sections.filter(s=>typeof s.text==='string'&&s.text.trim()):[{text}];
 function layout(groups,side,compact,size){
  const width=side-112,school=faculty?wrap(faculty,side-160,14):[];
  const cardTop=compact?104:124,schoolY=compact?132:164,top=compact?schoolY+school.length*19+12:Math.max(200,187+school.length*23),bottom=side-(compact?119:170);
  const lineHeight=compact?size+9:size+20;
  const lines=groups.flatMap(g=>[...(g.title?[{text:g.title,title:true,color:g.kind==='negative'?'#aa8148':'#208568'}]:[]),...wrap(compact?g.text.replace(/\s*\n\s*/g,' '):g.text,width,size).map(text=>({text}))]);
  const heights=lines.map(l=>l.title?compact?25:lineHeight:lineHeight),total=heights.reduce((a,b)=>a+b,0);
  return {groups,side,compact,size,school,schoolY,cardTop,top,bottom,lines,heights,total,fits:total<=bottom-top};
 }
 function fit(groups){for(const [compact,size] of [[false,24],[true,24],[true,22],[true,20],[true,18]]){const l=layout(groups,600,compact,size);if(l.fits)return l}return null}
 function wholeSection(groups){let l=fit(groups);if(l)return l;for(let side=680;side<=2400;side+=80){l=layout(groups,side,true,18);if(l.fits)return l}throw Error('text-too-long')}
 const together=fit(groups),layouts=together?[together]:groups.length>1?groups.map(g=>wholeSection([g])):[wholeSection(groups)];
 const blobs=[];
 for(const l of layouts){
 const {side,compact,size,school,schoolY,cardTop,lines,heights}=l,footerY=side-(compact?111:145),cardBottom=side-(compact?78:105),height=side;
 canvas.width=side*2;canvas.height=side*2;ctx.scale(2,2);
 ctx.fillStyle='#f5f7f7';ctx.fillRect(0,0,side,height);
 ctx.drawImage(logo,32,compact?20:32,65,68);
 function write(value,x,y,size,color,align='right',weight=400,direction='rtl'){setFont(size,weight);ctx.fillStyle=color;ctx.textAlign=align;ctx.direction=direction;ctx.fillText(value,x,y)}
 write('EMLE in a Nutshell',111,compact?50:62,18,'#162e38','left',600,'ltr');write('Your Feedbacks',111,compact?77:89,12,'#107e73','left',400,'ltr');
 ctx.beginPath();ctx.roundRect(32,cardTop,side-64,cardBottom-cardTop,12);ctx.fillStyle='#ffffff';ctx.fill();ctx.strokeStyle='#e3e9e9';ctx.lineWidth=1;ctx.stroke();
 ctx.font='60px Georgia';ctx.textAlign='left';ctx.direction='ltr';ctx.fillStyle='#d9eae4';ctx.fillText('“',54,compact?149:176);
 school.forEach((line,i)=>write(line,side-56,schoolY+i*(compact?19:23),14,'#162e38','right',500));
 let y=l.top+(l.bottom-l.top-l.total)/2;lines.forEach((line,i)=>{write(line.text,side-56,y+(line.title?18:size+4),line.title?14:size,line.title?line.color:'#4a6169','right',line.title?500:400);y+=heights[i]});
 const rule=y=>{ctx.beginPath();ctx.moveTo(56,y);ctx.lineTo(side-56,y);ctx.strokeStyle='#e3e9e9';ctx.stroke()};rule(footerY);
 if(Number.isFinite(timestamp)&&timestamp>0){const options={timeZone:'Africa/Cairo'};write(new Intl.DateTimeFormat('ar-EG',{...options,day:'numeric',month:'short',year:'numeric'}).format(timestamp),side-56,footerY+27,11,'#95a4aa');write(new Intl.DateTimeFormat('en-US',{...options,hour:'numeric',minute:'2-digit',hour12:true}).format(timestamp)+(isUpdate?' · آخر تعديل':''),56,footerY+27,11,'#95a4aa','left',400,'ltr')}
 else write('توقيت الإرسال غير متاح',side-56,footerY+27,11,'#95a4aa');
 rule(cardBottom+(compact?12:25));
 write('قناة التليجرام',side-32,side-(compact?46:44),10,'#71818b');write('t.me/EMLEinNutshell',32,side-(compact?46:44),11,'#107e73','left',400,'ltr');
 write('للتواصل وتفعيل المنصة',side-32,side-20,10,'#71818b');write('t.me/EMLE_inNutshell_Contact',32,side-20,11,'#107e73','left',400,'ltr');
 blobs.push(await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('image failed')),'image/png')));
 }
 return blobs.length===1?blobs[0]:blobs;
};
