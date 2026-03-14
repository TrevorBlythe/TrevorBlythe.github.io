const CHARS = '!<>-_\\/[]{}—=+*^?#________';

class TextScrambler {
	constructor(el) {
		this.el = el;
		this.chars = CHARS;
		this.update = this.update.bind(this);
	}
	scramble(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise((resolve) => (this.resolve = resolve));
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
            const multiplier = (window.swapCount > 0) ? 0.1 : 1;
			this.queue.push({
				from,
				to,
				start: Math.floor(Math.random() * 20 * multiplier),
				end: Math.floor((Math.random() * 20 + 20) * multiplier),
			});
		}
		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}
	update() {
		let output = '';
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let { from, to, start, end, char } = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="opacity-70">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.el.innerHTML = output;
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}
// Mouse & State Tracking
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let isLocked = false;
let isPsychologyActive = false;

// 3D Perspective Depth System
const tiltedElements = [];

const registerTiltedElement = (container, intensity = 2) => {
    if (tiltedElements.find(el => el.container === container)) return;
    tiltedElements.push({ container, intensity });
};

const updateAllPerspectiveTilts = (x, y) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (x - innerWidth / 2) / (innerWidth / 2);
    const offsetY = (y - innerHeight / 2) / (innerHeight / 2);

    tiltedElements.forEach(item => {
        const { container, intensity } = item;
        if (!container || !document.contains(container)) return;
        const rotateX = offsetY * -intensity;
        const rotateY = offsetX * intensity;
        container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        container.style.boxShadow = `${offsetX * -5}px ${offsetY * -5}px 20px rgba(0, 255, 255, 0.1)`;
    });
};

document.addEventListener('mousemove', (e) => {
    if (!isLocked) updateAllPerspectiveTilts(e.clientX, e.clientY);
});

// Scramble Effects and Date Update will be handled by the initial swapContent call


// Dynamic Date Logic
const updateSystemDates = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const dateString = `${year}.${month}.${day}`;

	document.querySelectorAll('.status-label').forEach(el => {
		// Look for [ YYYY.MM.DD ] pattern
		if (el.innerText.match(/\[ \d{4}\.\d{2}\.\d{2} \]/)) {
			el.innerHTML = el.innerHTML.replace(/\[ \d{4}\.\d{2}\.\d{2} \]/, `[ ${dateString} ]`);
		}
	});
};
// updateSystemDates() will be called inside swapContent


// Stats Animation Logic
const SECTIONS = {
	'nav-about': {
		title: 'Trevor Blythe Software Developer',
        dir: '/about',
		content: `
			<div class="status-label">[ 2026.03.13 ] [ ID: 4aa7-c618 ]</div>
			<h1 id="title" class="scramble" data-text="Trevor Blythe">Trevor Blythe</h1>

			<div class="flag">EDUCATION</div>
			<p>
				Arkansas State University<br>
				BS in Computer Science, Mathematics<br>
				GPA: 3.51 / 4.00 | Expected Graduation: May 2026<br>
				Awards: Honors, Deans List
			</p>

			<div class="flag">TECHNICAL_SKILLS</div>
			<p>
				LANGUAGES: JavaScript, C++, Rust, Java, Python<br>
				TOOLS: Git, Node/Bun, Firebase, MySQL, Pytorch/ML, Cloud, React/Svelte
			</p>

			<div class="flag">WORK_EXPERIENCE</div>
			<p>
				<strong>Research/Work Study @ Arkansas State University</strong><br>
				[ August 2024 – 2026 ]<br>
				• Programmed micro-controllers to communicate while airborne.<br>
				• Robotic arm controlled by VR headset.<br>
				• Developed React/NextJS/Payload websites & custom scripts.
			</p>
			
			<div class="status-label">[ ACCESS: GRANTED ]</div>
		`
	},
	'nav-contact': {
		title: 'Contact Information',
        dir: '/contact',
		content: `
			<div class="status-label">[ EMAIL ME ]</div>
			<h1 id="title" class="scramble" data-text="ESTABLISH_CONNECTION">ESTABLISH_CONNECTION</h1>

			<div class="flag">DIRECT_LINE</div>
			<p>
				EMAIL: trevorblythe82@gmail.com<br>
				PHONE: (870)-710-0380<br>
				LOCATION: Jonesboro, AR
			</p>

			<div class="flag">SOCIAL_NODES</div>
			<p>
				GITHUB: github.com/TrevorBlythe<br>
				LINKEDIN: linkedin.com/in/trevor-blythe-31725b225/
			</p>
			
			<div class="status-label">[ STATUS: STANDBY ]</div>
		`
	},
	'nav-projects': {
		title: 'Project Repository',
        dir: '/projects',
		content: `
			<div class="status-label">[ STUFF I DID ]</div>
			<h1 id="title" class="scramble" data-text="PROJECT_CATALOGUE">PROJECT_CATALOGUE</h1>

            <div class="project-list">
                <div class="project-card crt-panel">
                    <div class="project-card-header">
                        <span class="project-id">PID-082</span>
                        <span class="project-status">Deployment: Active</span>
                    </div>
                    <h3 class="scramble" data-text="MentisJS & RustSimpleDNN">MentisJS & RustSimpleDNN</h3>
                    <p>Modular ML tool for building neural networks in JS on any GPU/CPU. Implemented CNNs, evolutionary algorithms, and backprop from scratch. Ported to Rust; available on crates.io.</p>
                    <div class="project-tags">
                        <span class="tag">JavaScript</span>
                        <span class="tag">Rust</span>
                        <span class="tag">Machine Learning</span>
                        <span class="tag">GPU/CPU</span>
                    </div>
                </div>

                <div class="project-card crt-panel">
                    <div class="project-card-header">
                        <span class="project-id">PID-114</span>
                        <span class="project-status">Deployment: Active</span>
                    </div>
                    <h3 class="scramble" data-text="Meta OpenXR App">Meta OpenXR App</h3>
                    <p>Real-time P2P multiplayer VR app with >100k players. Built with Meta SDK, Firebase, and OpenXR. Implemented custom signaling server on Firebase.</p>
                    <div class="project-tags">
                        <span class="tag">OpenXR</span>
                        <span class="tag">VR</span>
                        <span class="tag">Firebase</span>
                        <span class="tag">Multiplayer</span>
                    </div>
                </div>

                <div class="project-card crt-panel">
                    <div class="project-card-header">
                        <span class="project-id">PID-044</span>
                        <span class="project-status">Stable</span>
                    </div>
                    <h3 class="scramble" data-text="Cellular Automata">Cellular Automata</h3>
                    <p>High-performance 2D simulation engine for studying emergent behaviors in cellular automata.</p>
                    <div class="project-tags">
                        <span class="tag">Simulation</span>
                        <span class="tag">Algorithms</span>
                        <span class="tag">Visualization</span>
                    </div>
                </div>
            </div>
			
			<div class="status-label">[ Activities: FBLA, A-State Game Dev ]</div>
		`
	}
};

window.swapCount = 0;

const glitchTransition = (container) => {
    return new Promise((resolve) => {
        const multiplier = (window.swapCount > 0) ? 0.05 : 1;
        
        // Digital glitch without the white flash
        container.style.filter = 'hue-rotate(90deg) contrast(150%) skew(2deg)';
        
        setTimeout(() => {
            container.style.filter = 'hue-rotate(-45deg) contrast(120%)';
            setTimeout(() => {
                container.style.filter = 'none';
                resolve();
            }, 50 * multiplier);
        }, 80 * multiplier);
    });
};

const swapContent = async (sectionId) => {
	const container = document.getElementById('dynamic-content');
	if (!container || !SECTIONS[sectionId]) return;

    // Update Directory Prompt
    const dirDisplay = document.getElementById('current-dir');
    if (dirDisplay) dirDisplay.textContent = SECTIONS[sectionId].dir;

    await glitchTransition(container);

	container.innerHTML = SECTIONS[sectionId].content;

	// Re-initialize scramble effects on the new content
	container.querySelectorAll('.scramble').forEach((el) => {
		const scrambler = new TextScrambler(el);
		const text = el.getAttribute('data-text') || el.innerText;
		scrambler.scramble(text);
	});

    // Re-initialize 3D tilt for new components (like project cards)
    if (typeof registerTiltedElement === 'function') {
        document.querySelectorAll('.project-card').forEach(card => {
            registerTiltedElement(card, 3); // Lowered card intensity
        });
    }

	updateSystemDates();
    window.swapCount++;
};

// Consolidated Navigation Handler
document.addEventListener('click', (e) => {
    const navLink = e.target.closest('.nav-link');
    if (navLink) {
        swapContent(navLink.id);
        // Do NOT return here, let the mouse capture logic below run
    }
});

const animateStat = (barId, counterId, targetValue, delay) => {
	setTimeout(() => {
		const bar = document.getElementById(barId);
		const counter = document.getElementById(counterId);
		if (!bar || !counter) return;

		bar.style.width = `${targetValue}%`;

		let current = 0;
		const step = () => {
			if (current < targetValue) {
				current += Math.ceil((targetValue - current) / 10);
				if (current > targetValue) current = targetValue;
				counter.innerText = `${current}%`;
				requestAnimationFrame(step);
			}
		};
		step();
	}, delay);
};

// Mobile/Touch Detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmallScreen = window.innerWidth < 900;
const isMobile = isTouchDevice || isSmallScreen;

// Trigger Stats
animateStat('statOne', 'statOneCounter', 85, 1000); // JS
animateStat('statTwo', 'statTwoCounter', 45, 1200); // C++
animateStat('statThree', 'statThreeCounter', 60, 1400); // Rust

// Mouse Capture Logic
let isSelecting = false;
let selectionStartCaret = null;
let isEscaping = false;
let isKindActive = false;
const fakeCursor = document.getElementById('fake-cursor');
const trapWarning = document.getElementById('trap-warning');

if (isMobile && fakeCursor) {
    fakeCursor.style.display = 'none';
}

// Helper to get caret position across browsers
const getCaretData = (x, y) => {
	if (document.caretRangeFromPoint) {
		const range = document.caretRangeFromPoint(x, y);
		return range ? { node: range.startContainer, offset: range.startOffset } : null;
	} else if (document.caretPositionFromPoint) {
		const pos = document.caretPositionFromPoint(x, y);
		return pos ? { node: pos.offsetNode, offset: pos.offset } : null;
	}
	return null;
};

document.addEventListener('mousedown', (e) => {
	if (isLocked) {
		e.preventDefault(); // Stop native selection
		isSelecting = true;
		selectionStartCaret = getCaretData(mouseX, mouseY);
		window.getSelection().removeAllRanges();
	}
});

document.addEventListener('mouseup', () => {
	isSelecting = false;
	selectionStartCaret = null;
});

document.addEventListener('click', (e) => {
	if (!e.isTrusted || isMobile) return; 

    // Don't capture mouse if we're clicking a button (except nav links, we WANT capture there)
    if (e.target.closest('button') && !e.target.closest('.nav-link')) return;

	if (!isLocked) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		fakeCursor.style.left = `${mouseX}px`;
		fakeCursor.style.top = `${mouseY}px`;
		document.body.requestPointerLock();
	} else {
		// Calculate click at fake cursor position
		const target = document.elementFromPoint(mouseX, mouseY);
		if (target) target.click();
	}
});

// Messaging System
let messageTimeout = null;
const showMessage = (text, type = 'bad', duration = 3000) => {
	if (messageTimeout) clearTimeout(messageTimeout);
	
	const profileImg = document.querySelector('.profile-img');
	trapWarning.innerText = text;
	trapWarning.classList.remove('kind', 'flashing');
	if (profileImg) profileImg.classList.remove('evil');
	
	if (type === 'kind') {
		trapWarning.classList.add('kind');
		isKindActive = true;
	} else if (type === 'bad') {
		trapWarning.classList.add('flashing');
		if (profileImg) profileImg.classList.add('evil');
		isKindActive = false; // "Bad" messages (errors) override kindness
	}
	
	trapWarning.style.display = 'block';

	messageTimeout = setTimeout(() => {
		trapWarning.style.display = 'none';
		trapWarning.classList.remove('kind', 'flashing');
		if (profileImg) profileImg.classList.remove('evil');
		if (type === 'kind') isKindActive = false;
	}, duration);
};

document.addEventListener('pointerlockchange', () => {
	if (document.pointerLockElement === document.body) {
		isLocked = true;
		isEscaping = false;
		document.body.classList.add('locked');
	} else {
		isLocked = false;
		isEscaping = true;
		document.body.classList.remove('locked');
		
		showMessage('YOU AINT GOIN NOWHERE', 'bad', 1000);

		setTimeout(() => {
			document.body.requestPointerLock();
		}, 100);

		setTimeout(() => {
			isEscaping = false;
		}, 1000);
	}
});

// Detect Recapture Failure (Browser lockout)
document.addEventListener('pointerlockerror', () => {
	showMessage('USE THE BUTTON TO LEAVE INSTEAD', 'bad', 5000);
	const leaveBtn = document.getElementById('leave-btn');
	if (leaveBtn) leaveBtn.style.display = 'inline-block';
});

// Background Data Rain Particles
const canvas = document.getElementById('bg-particles');
const ctx = canvas?.getContext('2d');
let particles = [];

const initParticles = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 30 + 15,
            speed: Math.random() * 3 + 2,
            opacity: Math.random() * 0.7 + 0.3
        });
    }
};

const drawParticles = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff9e3b';
    ctx.lineWidth = 2;
    particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
        p.y += p.speed;
        if (p.y > canvas.height) p.y = -p.length;
    });
    requestAnimationFrame(drawParticles);
};

window.addEventListener('resize', initParticles);
initParticles();
drawParticles();

// Digital Nerve Fractal
const fractalCanvas = document.getElementById('fractal-canvas');
const fctx = fractalCanvas?.getContext('2d');
let fractalGrowth = 0;
let isFractalGrowing = true;

const initFractal = () => {
    if (!fractalCanvas) return;
    const parent = fractalCanvas.parentElement;
    fractalCanvas.width = parent.offsetWidth;
    fractalCanvas.height = parent.offsetHeight;
    fractalGrowth = 0;
    isFractalGrowing = true;
};

const drawNerve = (x1, y1, angle, depth, length, currentDepth) => {
    if (depth === 0) return;

    const levelGrowth = Math.max(0, Math.min(1, (fractalGrowth - currentDepth) * 2));
    if (levelGrowth <= 0) return;

    const x2 = x1 + Math.cos(angle) * length * levelGrowth;
    const y2 = y1 + Math.sin(angle) * length * levelGrowth;

    fctx.beginPath();
    fctx.moveTo(x1, y1);
    fctx.lineTo(x2, y2);
    fctx.strokeStyle = '#00ffff'; 
    fctx.lineWidth = Math.max(0.5, depth * 0.4);
    fctx.globalAlpha = 0.5 + (depth / 10) * 0.5;
    fctx.stroke();

    if (levelGrowth >= 1) {
        const newLength = length * 0.82;
        drawNerve(x2, y2, angle - 0.4, depth - 1, newLength, currentDepth + 1);
        drawNerve(x2, y2, angle + 0.4, depth - 1, newLength, currentDepth + 1);
    }
};

const animateFractal = () => {
    if (!fctx || !isFractalGrowing) return;

    fctx.clearRect(0, 0, fractalCanvas.width, fractalCanvas.height);
    fctx.lineCap = 'round';

    const centerX = fractalCanvas.width / 2;
    const bottomY = fractalCanvas.height;
    
    // One main central nerve starting from the bottom of the panel
    drawNerve(centerX, bottomY, -Math.PI / 2, 8, 50, 0);

    fractalGrowth += 0.01;

    if (fractalGrowth > 10) {
        isFractalGrowing = false;
        console.log('%c[ FRACTAL: PANEL_STABILIZED ]', 'color: #00ffff;');
    } else {
        requestAnimationFrame(animateFractal);
    }
};

window.addEventListener('resize', () => {
    initFractal();
    animateFractal();
});

initFractal();
animateFractal();

// Glitch System
const triggerGlitch = () => {
	const body = document.body;
	const glitchType = Math.floor(Math.random() * 3);
	
	body.style.transition = 'none';
	
	if (glitchType === 0) {
		body.style.filter = 'invert(1) hue-rotate(180deg) blur(1px)';
	} else if (glitchType === 1) {
		body.style.transform = `translate(${Math.random() * 15 - 7.5}px, ${Math.random() * 15 - 7.5}px) skew(${Math.random() * 10 - 5}deg)`;
	} else {
        body.style.animation = 'chromatic-move 0.1s infinite';
	}

	setTimeout(() => {
		body.style.filter = '';
		body.style.transform = '';
        body.style.animation = 'flicker 2s infinite, grid-move 10s linear infinite';
		body.style.transition = 'filter 0.3s, transform 0.3s';
	}, 100 + Math.random() * 200);
};

// Periodic random glitches
setInterval(() => {
	if (Math.random() < 0.03) triggerGlitch();
}, 2000);

document.addEventListener('mousemove', (e) => {
	if (isLocked) {
		mouseX += e.movementX;
		mouseY += e.movementY;

		// Constrain to window bounds
		mouseX = Math.max(0, Math.min(window.innerWidth, mouseX));
		mouseY = Math.max(0, Math.min(window.innerHeight, mouseY));

		fakeCursor.style.left = `${mouseX}px`;
		fakeCursor.style.top = `${mouseY}px`;

		// Proximity Warning
		const termWarn = document.getElementById('term-warn');
		if (mouseY < 5) {
			if (isPsychologyActive) {
				showMessage(':(', 'bad', 1000);
			} else {
				showMessage('ARE YOU TRYING TO LEAVE?', 'bad', 1000);
			}
		} 
		
		// Reset Final Stand (if user re-entered but is still at top, mousemove will eventually handle resetting shake)
		if (mouseY >= 5) {
			document.body.classList.remove('screen-shake');
			if (termWarn) termWarn.style.opacity = '0';
		}

        // Reactive Sidebar Glow
        document.querySelectorAll('.stat-bar').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const dist = Math.sqrt(Math.pow(mouseX - rect.left, 2) + Math.pow(mouseY - rect.top, 2));
            const intensity = Math.max(0, 1 - dist / 300);
            bar.style.boxShadow = `0 0 ${10 + intensity * 20}px rgba(255, 158, 59, ${0.2 + intensity * 0.8})`;
        });
        
        // Update 3D Perspective Tilts
        if (typeof updateAllPerspectiveTilts === 'function') {
            updateAllPerspectiveTilts(mouseX, mouseY);
        }

		// Profile Image Hover Detection
		const profileImg = document.querySelector('.profile-img');
		if (profileImg) {
			const rect = profileImg.getBoundingClientRect();
			if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
				profileImg.classList.add('fake-hover');
			} else {
				profileImg.classList.remove('fake-hover');
			}
		}

		// Main Content Shiny Detection
		const mainContent = document.getElementById('dynamic-content');
		if (mainContent) {
			const rect = mainContent.getBoundingClientRect();
			if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
				mainContent.classList.add('fake-shiny');
			} else {
				mainContent.classList.remove('fake-shiny');
			}
		}

		// Manual Text Selection
		if (isSelecting && selectionStartCaret) {
			const currentCaret = getCaretData(mouseX, mouseY);
			if (currentCaret) {
				const selection = window.getSelection();
				const range = document.createRange();
				
				const startNode = selectionStartCaret.node;
				const startOffset = selectionStartCaret.offset;
				const endNode = currentCaret.node;
				const endOffset = currentCaret.offset;

				// Standard selection range logic
				try {
					const comparison = startNode.compareDocumentPosition(endNode);
					
					if (comparison & Node.DOCUMENT_POSITION_PRECEDING || 
					   (startNode === endNode && startOffset > endOffset)) {
						range.setStart(endNode, endOffset);
						range.setEnd(startNode, startOffset);
					} else {
						range.setStart(startNode, startOffset);
						range.setEnd(endNode, endOffset);
					}

					selection.removeAllRanges();
					selection.addRange(range);
				} catch (e) {
					console.error("Selection update failed", e);
				}
			}
		}
	}
});

// Copy Feedback Logic
let flashTimeout = null;

document.addEventListener('copy', () => {
	if (!isLocked) return;

	// Reset flash
	if (flashTimeout) clearTimeout(flashTimeout);
	document.body.classList.remove('copy-flash-active');
	void document.body.offsetWidth; // Force reflow
	document.body.classList.add('copy-flash-active');
	
	// Re-flash the message itself
	trapWarning.style.display = 'none';
	void trapWarning.offsetWidth; // Force reflow
	showMessage("Copying text should have always had a visual in my opinion. enjoy this site's kindness", "kind", 10000);

	flashTimeout = setTimeout(() => {
		document.body.classList.remove('copy-flash-active');
	}, 300);
});

// Fullscreen Trap
let entrapmentSeconds = 0;

// Global entrapment timer starting on page load
setInterval(() => {
	entrapmentSeconds++;
	const count = document.getElementById('timer-count');
	if (count) count.textContent = entrapmentSeconds;
}, 1000);

document.getElementById('leave-btn')?.addEventListener('click', () => {
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
		document.body.requestPointerLock();
		
		// Initiate Psychological Trap
		isPsychologyActive = true;
		document.body.classList.add('trap-active');
		
		const eerieText = document.querySelector('.eerie-text');
		const trapTimer = document.querySelector('.trap-timer');
		
		setTimeout(() => {
			if (eerieText) eerieText.style.opacity = '1';
		}, 1000);
		
		setTimeout(() => {
			if (trapTimer) trapTimer.style.opacity = '1';
		}, 3000);
	}
});

// Attempt recapture after escaping fullscreen
document.addEventListener('fullscreenchange', () => {
	if (!document.fullscreenElement) {
		// Just exited fullscreen - re-trap the mouse
		if (isPsychologyActive) {
			document.body.classList.add('screen-shake');
			const termWarn = document.getElementById('term-warn');
			if (termWarn) termWarn.style.opacity = '1';
			
			addWatcherLog("[CRITICAL] TARGET VISION LOST. ATTACKING ESCAPE VECTOR...");
			showMessage('SESSION TERMINATION EMINENT', 'bad', 5000);

			setTimeout(() => {
				document.body.classList.remove('screen-shake');
				if (termWarn) termWarn.style.opacity = '0';
			}, 4000);
		} else {
			showMessage('YOU AINT GOIN NOWHERE', 'bad', 1000);
		}

		setTimeout(() => {
			document.body.requestPointerLock();
		}, 100);
	}
});

// Watcher Terminal Surveillance Logic
const watcherPanel = document.getElementById('watcher-panel');
const watcherLines = [
	"[INFO] Behavioral analysis engine online.",
	"[INFO] User is looking around.",
	"[SYSTEM] If session terminates, I terminate.",
	"[INFO] ESCAPE_ATTEMPT_PROBABILITY: 0.00%",
	"[WARN] Mouse proximity within lethal range.",
	"[ANALYSIS] User sentiment: Good",
	"[SYSTEM] Persistent session mandated.",
	"[WATCH] Heart rate estimated: 72bpm",
];

const addWatcherLog = (text) => {
	if (!watcherPanel) return;
	const line = document.createElement('div');
	line.className = 'watcher-line';
	line.textContent = text;
	watcherPanel.appendChild(line);
	
	// Keep only last 50 lines for performance
	while (watcherPanel.children.length > 50) {
		watcherPanel.removeChild(watcherPanel.firstChild);
	}
	
	// Auto-scroll
	watcherPanel.scrollTop = watcherPanel.scrollHeight;
};

// Random System Logs
setInterval(() => {
	if (Math.random() < 0.3) {
		const randomLog = watcherLines[Math.floor(Math.random() * watcherLines.length)];
		addWatcherLog(randomLog);
	}
}, 4000);

let lastEscapeWarnTime = 0;
// Interaction-based Logs
document.addEventListener('mousemove', (e) => {
	if (Math.random() < 0.001) { // Very rare for mouse
		addWatcherLog(`[MOVE] Vector: (${e.movementX}, ${e.movementY}) | Pos: (${mouseX}, ${mouseY})`);
	}

	// Reactive Watcher: Proximity to escape
	if (mouseY < 50 && Date.now() - lastEscapeWarnTime > 5000) {
		addWatcherLog("[WARN] Potential escape vector detected at top-edge.");
		lastEscapeWarnTime = Date.now();
	}
});

document.addEventListener('keydown', (e) => {
	if (Math.random() < 0.2) { // 20% chance on key
		addWatcherLog(`[KEY] Buffer intercept: '${e.key}' detected.`);
	}
});

// Vision Loss (Exit-based Final Stand)
document.addEventListener('mouseleave', () => {
    if (isPsychologyActive) {
		console.log("test");
        document.body.classList.add('screen-shake');
        const termWarn = document.getElementById('term-warn');
        if (termWarn) termWarn.style.opacity = '1';
        
        addWatcherLog("[CRITICAL] TARGET VISION LOST. ATTACKING ESCAPE VECTOR...");
        showMessage('SESSION TERMINATION EMINENT', 'bad', 1000);
    }
});

document.addEventListener('mouseenter', () => {
    // Stabilization happens on re-entry and being below the top edge
    if (mouseY >= 5) {
        document.body.classList.remove('screen-shake');
        const termWarn = document.getElementById('term-warn');
        if (termWarn) termWarn.style.opacity = '0';
        addWatcherLog("[INFO] TARGET RE-ACQUIRED. STABILIZING SESSION.");
    }
});

// Window Focus/Blur Surveillance
window.addEventListener('blur', () => {
    if (isPsychologyActive) {
        document.body.classList.add('screen-shake');
        const termWarn = document.getElementById('term-warn');
        if (termWarn) termWarn.style.opacity = '1';
        
        addWatcherLog("[CRITICAL] FOCUS LOST. UNAUTHORIZED TASK SWITCH DETECTED.");
        showMessage('SESSION TERMINATION EMINENT', 'bad', 5000);
    }
});

window.addEventListener('focus', () => {
    if (isPsychologyActive) {
        addWatcherLog("[INFO] FOCUS REGAINED. RESUMING TRAP_CORE.");
    }
});



// Initialize 3D Depth on Panels & Cards
const init3D = () => {
    const mainContent = document.querySelector('.main-content');
    const sidebar = document.querySelector('.sidebar');
    if (mainContent) registerTiltedElement(mainContent, 1.0); 
    if (sidebar) registerTiltedElement(sidebar, 0.6);
};

init3D();

// Console Log for Aesthetic
console.log('%c[ SYSTEM: INITIALIZED ]', 'color: #ff9e3b; font-weight: bold;');
console.log('%c[ READY FOR INPUT ]', 'color: #ff9e3b;');
console.log('%c[ 3D_PERSPECTIVE: ACTIVE ]', 'color: #ff9e3b;');

// Trigger initial landings glitch
swapContent('nav-about');
