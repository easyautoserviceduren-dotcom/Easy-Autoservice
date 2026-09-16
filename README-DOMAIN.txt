# ربط الدومين easyautoserviceduren.com بـ GitHub Pages

## الخطوة 1: في GitHub
1. اذهب إلى Repository > Settings > Pages
2. في Custom domain اكتب: easyautoserviceduren.com
3. اضغط Save
4. فعل Enforce HTTPS بعد دقائق

## الخطوة 2: في موقع الدومين (حيث اشتريت easyautoserviceduren.com)
اذهب إلى DNS Settings وأضف هذه السجلات:

### للـ Apex Domain (easyautoserviceduren.com):
Type: A, Host: @, Value: 185.199.108.153
Type: A, Host: @, Value: 185.199.109.153
Type: A, Host: @, Value: 185.199.110.153
Type: A, Host: @, Value: 185.199.111.153

### للـ www:
Type: CNAME, Host: www, Value: easyautoserviceduren-dotcom.github.io

## الملفات:
- index.html = نسخة نظيفة لـ GitHub Pages بدون أخطاء CORS (استخدمها الآن)
- index-with-gabster.html = نسخة بالـ Chat للدومين الرسمي (استخدمها بعد ربط الدومين)
- CNAME = ملف يخبر GitHub بالدومين الرسمي
- .nojekyll = يسمح لـ sw.js بالعمل

بعد ربط الدومين، غير اسم index-with-gabster.html إلى index.html وارفعه.
