# 📦 NPM Publishing Guide

## Quick Steps to Publish

### Step 1: Create npm Account (if needed)
👉 Go to: https://www.npmjs.com/signup
- Use your email: serbehmichael3@gmail.com
- Choose a username
- Verify your email

### Step 2: Login to npm
```bash
npm login
```
Enter:
- Username: (your npm username)
- Password: (your npm password)
- Email: serbehmichael3@gmail.com

### Step 3: Check Package Name Availability
```bash
npm view dev-time-tracker
```

**Result:**
- If you see `npm ERR! code E404` → ✅ Name is **AVAILABLE**
- If you see package info → ❌ Name is **TAKEN** (try a different name)

### Step 4: Publish to npm
```bash
npm publish
```

**Success message will look like:**
```
+ dev-time-tracker@1.0.0
```

### Step 5: Verify Publication
```bash
npm view dev-time-tracker
```

You should see your package details!

### Step 6: Install from npm (Test)
```bash
npm install -g dev-time-tracker
track --version
```

## After Publishing

Your package will be available at:
👉 https://www.npmjs.com/package/dev-time-tracker

Anyone can install with:
```bash
npm install -g dev-time-tracker
```

## Updating Your Package

When you make changes:

```bash
# Update version (choose one):
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# Then publish
npm publish
```

## Troubleshooting

**Error: "You must verify your email"**
- Check your email and verify it

**Error: "Package name already exists"**
- Try: `dev-time-tracker-cli` or `@michaelserbeh/dev-time-tracker`

**Error: "403 Forbidden"**
- Make sure you're logged in: `npm whoami`
- Check your npm account permissions

---

**Ready to publish! 🚀**
