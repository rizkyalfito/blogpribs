# 🔧 Troubleshoot Vercel Deployment - HTTP 405 Error

## Penyebab Error 405

Error 405 "Method Not Allowed" di login page biasanya berarti:
1. ❌ Environment variables **TIDAK SET** di Vercel
2. ❌ Supabase auth endpoint tidak bisa di-reach
3. ❌ CORS configuration error

---

## ✅ Checklist Vercel Deployment

### 1. Environment Variables di Vercel
**WAJIB SET SEBELUM DEPLOY:**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Cara set:**
1. Go to Vercel Dashboard → Project Settings
2. Go to "Environment Variables"
3. Add both variables above
4. **Redeploy** setelah set variables

### 2. Verify Variables di Vercel
Masuk ke Vercel Deployments → Select latest → Logs

Cari di logs apakah `NEXT_PUBLIC_SUPABASE_URL` ada. Jika tidak muncul = **TIDAK SET**.

### 3. Redeploy After Setting Variables
```bash
# Dari GitHub
git push main  # Trigger auto-redeploy

# Atau dari CLI
vercel --prod --force
```

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Vercel Environment Variables
```
Dashboard → Settings → Environment Variables
```

**Harus ada:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` 
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Jika kosong = **TAMBAHKAN SEKARANG**

### Step 2: Check Deployment Logs
```
Vercel Dashboard → Deployments → Select latest → Logs → Function logs
```

Cari error messages tentang:
- `NEXT_PUBLIC_SUPABASE_URL undefined`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY undefined`
- `Failed to connect to Supabase`

### Step 3: Redeploy
Setelah add environment variables:
```bash
# Option 1: Push ke GitHub
git add .
git commit -m "Fix env vars"
git push origin main

# Option 2: Redeploy dari CLI
cd d:\blogpribs
vercel --prod
```

### Step 4: Test
Tunggu deployment selesai (2-3 menit), lalu:
1. Buka site di Vercel
2. Klik Login
3. Cek apakah page load OK

---

## 📋 Environment Variables Reference

### NEXT_PUBLIC_SUPABASE_URL
```
Format: https://xxxxx.supabase.co
Dari: Supabase Dashboard → Settings → API
Copy: URL (bukan API key)
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Dari: Supabase Dashboard → Settings → API
Copy: anon public (jangan service_role_key!)
```

---

## 🚨 Common Issues

### Issue: "Failed to fetch" di login
**Penyebab:** Supabase URL/KEY tidak set
**Solusi:** 
1. Set environment variables di Vercel
2. Redeploy

### Issue: "Invalid API key"
**Penyebab:** Wrong API key (copy service_role_key instead of anon)
**Solusi:**
1. Go to Supabase Dashboard → Settings → API
2. Copy `anon public` key (bukan service_role_key)
3. Update di Vercel
4. Redeploy

### Issue: "CORS error"
**Penyebab:** Supabase CORS tidak allow Vercel domain
**Solusi:**
1. Go to Supabase Dashboard → Settings → API
2. Scroll to "CORS Allowed Origins"
3. Add your Vercel domain: `https://your-app.vercel.app`
4. Redeploy

---

## ✨ Quick Fix (5 menit)

1. **Buka Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Select Project → Settings**
   ```
   Settings → Environment Variables
   ```

3. **Add Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://emnpspqobragzftzbrpf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Redeploy**
   ```
   Deployments → Select latest → Redeploy → Confirm
   ```

5. **Wait & Test**
   ```
   Wait 2-3 minutes → Open site → Test login
   ```

---

## 📞 Still Not Working?

1. Check deployment logs untuk error detail
2. Verify Supabase credentials (copy dari Supabase dashboard)
3. Ensure `NEXT_PUBLIC_*` prefix di environment variables
4. Try local dev: `npm run dev` - apakah work?
5. Check Supabase status: https://status.supabase.com

---

**Status**: Error 405 hampir pasti dari missing environment variables di Vercel.
**Action**: Set environment variables + Redeploy = FIXED ✅
