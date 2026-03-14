# Riced Linux / Terminal Aesthetic Specification

This document provides the core tokens and CSS patterns required to recreate the "Riced Linux" tech aesthetic on any web project.

## 1. Core Color Palette (Dark Mode Primary)
- **Base Background**: `#080808` (Deep Terminal Black)
- **Panel Background**: `#121212` (Slightly lighter panels)
- **Accent (Primary)**: `#ff9e3b` (Terminal Orange / Amber)
- **Borders**: Transparent white or orange (`rgba(255, 158, 59, 0.1)`)
- **Text**: Off-white for readability, Orange for "computery" metadata.

## 2. Blueprint Background System (Pure CSS)
Apply this to a global wrapper or the `body`.

```css
.terminal-grid {
  background-color: #080808;
  background-image: 
    /* Crosshairs */
    radial-gradient(rgba(255, 158, 59, 0.15) 1px, transparent 1px),
    /* Major Grid 100px */
    linear-gradient(rgba(255, 158, 59, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 158, 59, 0.05) 1px, transparent 1px),
    /* Minor Grid 20px */
    linear-gradient(rgba(255, 158, 59, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 158, 59, 0.02) 1px, transparent 1px),
    /* Scanlines */
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.01) 2px, rgba(255, 255, 255, 0.01) 4px);
  background-size: 100px 100px, 100px 100px, 100px 100px, 20px 20px, 20px 20px, 100% 4px;
  background-attachment: fixed;
}
```

## 3. UI Component Patterns
- **Panels**: Sharp edges (`rounded-sm`), subtle borders, and a slight "lighten" effect on hover (`hover:bg-white/5`).
- **Headings**: Prefix main titles with a `> ` and use monospace font.
- **Status Labels**: Use bracketed monospace tags for status: `[ STATUS: OK ]` or `[ EDIT ACCESS ]`.
- **Typography**: 
  - Standard text for long descriptions.
  - **Monospace** for everything else (Dates, IDs, Buttons, Navigation).
- **Forms**: Input boxes should be sharp-edged with high-contrast active borders.

## 4. Computery Metadata Examples
The "Riced" look relies on distinguishing between human-readable content and "system" data.
- **Monospace + Primary Color**: Use this for anything that feels like a variable or a log entry.
- **Examples**:
  - **Dates**: `[ 2024.03.13 ]` instead of "March 13th, 2024".
  - **Timestamps**: `18:41:49 UTC`
  - **IDs/Slugs**: `id: 4aa7-c618` or `slug: /acm-riced-site`
  - **Status**: `[ STATUS: ACTIVE ]` or `[ ACCESS: GRANTED ]`

## 5. Micro-Interactions & Scramble Code
- **Blinking Cursor**: Add an `_` or `|` at the end of dynamic headers.
- **Scramble Text**: Animate characters changing state for a "decrypting" look.

### ScrambleText Component (React/Next.js)
```tsx
'use client'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const ScrambleText = ({ text, className = '', scrambleOnHover = false }) => {
  const spanRef = useRef(null)
  const previousTextRef = useRef(text)
  const isAnimatingRef = useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (!spanRef.current || text === previousTextRef.current) return
    let isMounted = true
    const oldText = previousTextRef.current
    const newText = text
    previousTextRef.current = text
    const maxLength = Math.max(oldText.length, newText.length)
    const queue = []

    for (let i = 0; i < maxLength; i++) {
      const to = newText[i] || ''
      const from = oldText[i] || ''
      if (from === to) {
        queue.push({ to, resolved: true, delay: 0 })
      } else {
        queue.push({
          to,
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          resolved: false,
          delay: Math.floor(Math.random() * 15) + 5,
        })
      }
    }

    let frame = 0
    const update = () => {
      if (!isMounted || !spanRef.current) return
      let output = ''; let complete = 0
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i]
        if (item.resolved) {
          complete++; output += item.to
        } else {
          if (frame >= item.delay) {
            item.resolved = true; complete++; output += item.to
          } else {
            if (Math.random() < 0.28) item.char = CHARS[Math.floor(Math.random() * CHARS.length)]
            output += `<span class="opacity-70">${item.char}</span>`
          }
        }
      }
      spanRef.current.innerHTML = output
      if (complete === queue.length) isAnimatingRef.current = false
      else { frame++; requestAnimationFrame(update) }
    }
    update()
    return () => { isMounted = false; isAnimatingRef.current = false }
  }, [text])

  return <span ref={spanRef} className={className}>{text}</span>
}
```
