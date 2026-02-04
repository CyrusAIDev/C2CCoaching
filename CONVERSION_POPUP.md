# Conversion Popup Setup

## Overview

A high-conversion popup that captures email and phone leads from website visitors. The popup triggers based on user behavior to maximize conversions without being intrusive.

## Features

### 🎯 Dual Trigger System

1. **Time-Based**: Shows after 15 seconds of browsing
2. **Exit Intent**: Triggers when user's mouse moves to leave the page (cursor goes above viewport)

### ✅ Smart Behavior

- **Shows Once**: Only appears once per visitor (tracked via localStorage)
- **Never Shows Again** after:
  - User submits their info
  - User closes the popup
- **Automatic Reset**: Clear localStorage to test again

### 📋 Data Collection

- **Email** (required)
- **Phone** (optional)
- Submissions sent to: `shania@fromcampus2corporate.com`
- Uses Web3Forms (same as contact form & newsletter)

### 🎨 Design Features

- Clean white background with light backdrop (not dark/spammy)
- Subtle backdrop blur for depth
- Smooth spring animations
- Professional brand colors (C2C navy, teal, offwhite)
- Larger, more readable text (18px-48px)
- Success state with checkmark animation
- Easy-to-find close button (X) in top-right
- Light, welcoming feel - not aggressive

### 💬 Conversion-Optimized Copy

- **Headline**: "Ready to Land Your Dream Role?"
- **Value Proposition**: Free career success toolkit delivered instantly
- **Benefits Listed**:
  - ATS-optimized resume templates
  - Complete interview prep checklist
  - LinkedIn profile optimization guide
  - Proven networking scripts
- **Trust Badges**: "Instant access" + "No spam"
- **CTA Button**: "Get My Free Toolkit"

## Testing the Popup

### Test Exit Intent
Move your cursor quickly to the top of the browser window (like you're going to close the tab)

### Test Time Trigger
Wait 15 seconds on the homepage

### Reset to Test Again
Open browser console and run:
```javascript
localStorage.removeItem('c2c-popup-dismissed')
localStorage.removeItem('c2c-popup-submitted')
```

Then refresh the page.

## Customization

### Change Trigger Timing
Edit `components/c2c/conversion-popup.tsx` line 28:
```typescript
setTimeout(() => {
  // Change 15000 to desired milliseconds
  // 10000 = 10 seconds
  // 30000 = 30 seconds
}, 15000)
```

### Change Copy
Edit lines 144-151 for headline/subheadline
Edit lines 155-160 for benefits list

### Change Form Fields
Add/remove fields in the form section (lines 150-170)

## Analytics Tracking

To track popup performance, add these events:
- Popup shown
- Popup closed (dismissed)
- Form submitted
- Success message shown

## Best Practices

✅ **DO:**
- Keep popup simple (2-3 fields max)
- Offer real value (free resources)
- Make close button obvious
- Show success state
- Use welcoming, positive language
- Match website colors and branding
- Use large, readable text

❌ **DON'T:**
- Show immediately on page load
- Show on every page refresh
- Ask for too much info
- Make it hard to close
- Use aggressive/negative copy (like "Don't leave!")
- Use dark, spammy backgrounds
- Make text too small to read

## Conversion Rate Tips

Current implementation includes these conversion optimization techniques:

1. **Positive Framing**: "Ready to land your dream role?" (not negative/fear-based)
2. **Value First**: Lead with what they GET, not what you want
3. **Specificity**: List exactly what's included
4. **Social Proof**: Could add "Join 500+ students" (if you have the numbers)
5. **Low Friction**: Email required, phone optional
6. **Visual Hierarchy**: Large text, big CTA button, clear benefits
7. **Trust Signals**: "No spam" + "Instant access"
8. **Professional Design**: Clean, matches brand, not spammy
9. **Readable Text**: 18px-48px font sizes for easy reading

## Expected Conversion Rate

Well-optimized popups typically convert at:
- **Exit Intent**: 2-5% of exit attempts
- **Time Delay**: 1-3% of visitors

With 1000 monthly visitors:
- ~20-50 new leads per month from exit intent
- ~10-30 new leads from time delay
- **Total: 30-80 new leads/month**

## Next Steps (Optional Enhancements)

1. **A/B Testing**: Test different headlines/copy
2. **Multi-Step Form**: Page 1 = Email only, Page 2 = Phone + preferences
3. **Personalization**: Different copy for mobile vs desktop
4. **Follow-Up Automation**: Auto-send the resources via email service
5. **Analytics**: Track show rate, dismiss rate, conversion rate
