# تحديث نوفمبر 2026

هذه نسخة المنصة المحلية المحدّثة بتاريخ 24 نوفمبر 2026. لم تُرفع إلى الموقع بعد.

- البنك: 2072 سؤالًا، منها 20 سؤالًا جديدًا من التجريبي، موزعة على Topics مع تفسير الإجابة ومناقشة البدائل.
- الأسئلة الموجودة احتفظت بنصوصها واختياراتها وإجاباتها وشروحها؛ أضيفت Tags الامتحان والتكرار فقط.
- التجريبي: `11/2026T`، 100 سؤال. المحاكاة: `11/2026S`، 100 سؤال. كلاهما ظاهر في Exams وقابل للحل.
- باقة الـ500 الأصلية محفوظة بالكامل، مع إضافة 23 سؤالًا، ليصبح الإجمالي 523 ويشمل الامتحانين كاملين. باقة الـ100 الأصلية محفوظة.
- مجموعة امتحانات 2025/2026 أصبحت 1074 سؤالًا.
- آخر سؤال في المحاكاة هو السؤال المضاف رقم 100. سؤال القيء أثناء الحمل محفوظ برقم 4 طبقًا لتصحيح المستخدم.

## ملاحظة الإجابة المراجعة

تم ربط السؤال 27 في تقرير تجريبي نوفمبر بـBank #1084 وإضافة 11/2026T له وحذف السجل المكرر #2062، مع الحفاظ على أرقام بقية الأسئلة. تم التحقق مباشرة من ملف Dr. Ahmed Amer QBank with Explanation أن مفتاح 1084 هو B — Appendectomy. تحتفظ المنصة بهذا المفتاح مؤقتًا وتعرض عنوانًا واضحًا لمصدره. الشرح الإنجليزي يعرض نص الحالتين والفروق بينهما، ويفصل إجابة فبراير 2024 الرسمية عن مفتاح البنك وعن ترجيحات المراجعة الطبية بالذكاء الاصطناعي. لا يُنسب ترجيح Closure إلى د. أحمد عامر أو إلى مفتاح رسمي لنوفمبر.

أعداد 20 سؤالًا مضافًا و23 إضافة للباقة تعكس إزالة هذا التكرار فقط؛ لم تُعد مراجعة بقية الحالات على جميع الصور التاريخية ضمن هذا التصحيح.

## التحقق

نجح فك البيانات بكود الـworker الفعلي من data.enc ومن data-enc.js. نجح اختبار الواجهة في Edge محليًا مع منع الاتصالات الخارجية: ظهور الامتحانين، وفتح سيشن فعلية من 100 سؤال لكل امتحان، دون أخطاء JavaScript. تم التحقق من حفظ عضوية الباقات ومن أن كل الأسئلة الجديدة مرتبطة بموضوع موجود في شابترها.

## الملفات

ارفع ملفات index.html وdata.enc وdata-enc.js وdata-worker.js معًا إلى نفس مجلد المنصة. admin.html محفوظ من الإصدار السابق. احتفظ بالنسخة السابقة للرجوع إليها عند الحاجة.

ملف الامتحانين المجمع موجود في `03. Sources & Feedback/November 2026 Combined/`، ويضم 200 موضع سؤال موزعة على الشباتر الـ18. الأسئلة المشتركة تظهر ضمن كل امتحان باسم الامتحان ورقم السؤال؛ شابتر Ophthalmology خالٍ من أسئلة هذين الامتحانين ومبيّن كذلك. إجابات الأسئلة الموجودة من مفتاح المنصة؛ إضافة الامتحانين لا تعني إعادة مراجعة كل إجابات البنك التاريخية.

Bank #1084: one-time answer/history reset on first use of this release. Revision marker is preserved in local/cloud progress and on retries. Other questions and bookmarks retained. Local migration and stale-cloud/reload tests passed.

The 20 newly added questions display AI Recommended Answer. Existing linked bank questions keep their original answer labels.

Production feedback integration: student feedback.html, Google/anonymous sign-in, server-validated saving and recovery, private admin feedback tab, per-exam scores out of 100, CSV, server-side progress snapshot. Firebase function and rules must be deployed before public release. Tested on isolated Firebase emulators; no live student data accessed.
