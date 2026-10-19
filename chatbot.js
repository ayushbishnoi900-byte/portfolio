(() => {
    "use strict";

    const launcher = document.getElementById("chatLauncher");
    const widget = document.getElementById("chatWidget");
    const closeButton = document.getElementById("closeChat");
    const clearButton = document.getElementById("clearChat");
    const messages = document.getElementById("chatMessages");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendMessage");
    const suggestions = document.getElementById("chatSuggestions");

    const welcomeMessage = "Hi! 👋 I’m Ayush’s portfolio assistant. Ask me about his skills, projects, or learning goals.";
    const knowledge = [
        {
            terms: ["hello", "hi", "hey", "good morning", "good evening", "namaste"],
            answer: "Hey there! 👋 Welcome to Ayush’s portfolio. You can ask about Ayush, his skills, projects, or how to get in touch."
        },
        {
            terms: ["who is ayush", "about ayush", "tell me about ayush", "about him", "introduction", "background"],
            answer: "Ayush Vishnoi is a Computer Science and Engineering student at JECRC University. He enjoys learning technology, building practical projects, and playing cricket, badminton, and volleyball."
        },
        {
            terms: ["education", "college", "university", "degree", "study", "studying"],
            answer: "Ayush is pursuing a B.Tech in Computer Science and Engineering at JECRC University, with an interest in AI, data science, and software development."
        },
        {
            terms: ["skill", "skills", "technology", "technologies", "programming language", "tech stack", "what can he do"],
            answer: "The portfolio lists C++, HTML, MySQL, and Express.js, with Python and JavaScript as learning areas. His skills and projects will evolve as he builds more."
        },
        {
            terms: ["project", "projects", "work", "portfolio"],
            answer: "Two projects are featured:\n\n• HMates — a hostel discovery/listing website concept for students and hostel owners.\n• PackCheck AI — an OCR-based concept for checking packaged-product labels against Legal Metrology requirements.\n\nUse the project links on this page to explore the work."
        },
        {
            terms: ["hmates", "hostel"],
            answer: "HMates is a hostel website concept intended to help students find places to stay and allow hostel owners to list their properties. The idea includes booking-related platform revenue."
        },
        {
            terms: ["packcheck", "legal metrology", "ocr", "compliance"],
            answer: "PackCheck AI is a compliance-scanner project concept. It aims to extract details from packaged-product labels using OCR and check items such as manufacturer details, net quantity, MRP, dates, and consumer-care information."
        },
        {
            terms: ["goal", "career", "internship", "future", "looking for", "objective"],
            answer: "Ayush’s stated goal is to strengthen his programming fundamentals, build useful projects, and become ready for software-development internship opportunities."
        },
        {
            terms: ["contact", "email", "reach", "hire", "collaborate", "connect"],
            answer: "Thanks for your interest! The portfolio currently doesn’t list a direct email address. You can use the project links on this page, and Ayush can add an email or professional profile link to the Contact section."
        },
        {
            terms: ["sports", "hobby", "hobbies", "free time", "interest"],
            answer: "Outside technology, Ayush enjoys cricket, badminton, and volleyball."
        },
        {
            terms: ["github", "source code", "repository", "repo", "code link"],
            answer: "The project cards on this page contain links to code/project pages. Open the relevant project card to explore them."
        },
        {
            terms: ["thank", "thanks", "thank you"],
            answer: "You’re welcome! 😊 Is there anything else you’d like to know about Ayush or his projects?"
        },
        {
            terms: ["help", "what can i ask", "options", "menu"],
            answer: "Try asking me:\n• Who is Ayush?\n• What skills does he have?\n• Tell me about HMates.\n• What is PackCheck AI?\n• What are his career goals?\n• How can I contact him?"
        }
    ];

    function setOpen(open) {
        widget.classList.toggle("is-open", open);
        widget.setAttribute("aria-hidden", String(!open));
        launcher.setAttribute("aria-expanded", String(open));
        launcher.querySelector(".chat-launcher-label").textContent = open ? "Chat open" : "Ask me";
        if (open) window.setTimeout(() => input.focus(), 120);
    }

    function timeNow() {
        return new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
    }

    function addMessage(text, sender) {
        const wrapper = document.createElement("div");
        wrapper.className = `chat-message ${sender}-message`;

        const bubble = document.createElement("div");
        bubble.className = "message-bubble";
        // textContent keeps visitor input as plain text, preventing HTML/script injection.
        bubble.textContent = text;

        const time = document.createElement("time");
        time.className = "message-time";
        time.textContent = timeNow();

        wrapper.append(bubble, time);
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
        return wrapper;
    }

    function addTyping() {
        const wrapper = document.createElement("div");
        wrapper.className = "chat-message bot-message";
        wrapper.setAttribute("aria-label", "Assistant is typing");
        const bubble = document.createElement("div");
        bubble.className = "message-bubble typing-indicator";
        bubble.innerHTML = "<span></span><span></span><span></span>";
        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;
        return wrapper;
    }

    function normalize(text) {
        return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
    }

    function getAnswer(question) {
        const q = normalize(question);
        if (!q) return "Please type a question and I’ll do my best to help.";
        let best = null;
        let bestScore = 0;
        for (const item of knowledge) {
            let score = 0;
            for (const term of item.terms) {
                const normalizedTerm = normalize(term);
                if (q === normalizedTerm) score += 4;
                else if (q.includes(normalizedTerm)) score += normalizedTerm.includes(" ") ? 3 : 1;
                else if (normalizedTerm.split(" ").length === 1 && q.split(" ").includes(normalizedTerm)) score += 1;
            }
            if (score > bestScore) {
                bestScore = score;
                best = item;
            }
        }
        if (best && bestScore > 0) return best.answer;
        return "I don’t have that detail in the portfolio yet. Try asking about Ayush’s education, skills, HMates, PackCheck AI, interests, or career goals. You can also suggest a question Ayush should add to this assistant.";
    }

    function submitQuestion(question) {
        const text = String(question || "").trim().slice(0, 500);
        if (!text) return;
        addMessage(text, "user");
        input.value = "";
        input.focus();
        sendButton.disabled = true;
        const typing = addTyping();
        window.setTimeout(() => {
            typing.remove();
            addMessage(getAnswer(text), "bot");
            sendButton.disabled = false;
            input.focus();
        }, 450 + Math.min(text.length * 5, 650));
    }

    launcher.addEventListener("click", () => setOpen(!widget.classList.contains("is-open")));
    closeButton.addEventListener("click", () => setOpen(false));
    clearButton.addEventListener("click", () => {
        messages.replaceChildren();
        addMessage(welcomeMessage, "bot");
        input.focus();
    });
    form.addEventListener("submit", event => {
        event.preventDefault();
        submitQuestion(input.value);
    });
    suggestions.addEventListener("click", event => {
        const button = event.target.closest("button[data-question]");
        if (button) submitQuestion(button.dataset.question);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && widget.classList.contains("is-open")) setOpen(false);
    });
})();
