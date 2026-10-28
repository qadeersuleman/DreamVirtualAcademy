'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Trash2, BookOpen, Volume2, Square } from 'lucide-react';
import styles from './UstadAiWidget.module.css';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  isTyping?: boolean;
}

const PRESET_CHIPS = [
  { label: '🌿 Photosynthesis سنڌي ۾', prompt: 'Photosynthesis process ke aasan Sindhi aur Urdu mein daily-life example ke saath samjhao.' },
  { label: '⚡ Newton’s 3rd Law', prompt: 'Newton third law of motion ke practical examples (STBB Physics) explain karein.' },
  { label: '📚 STS Pedagogy Tips', prompt: 'STS IBA Sukkur aur JST test ke liye Pedagogy & Teaching Methodology ki tayyari kaise karein?' },
  { label: '🧪 Acid vs Base', prompt: 'Sindh Board Chemistry: Acid aur Base mein main farq kya hai?' },
];

export default function UstadAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Salam! I am **Ustad AI (استاد اي آءِ)**, your 24/7 science tutor and STS/JST exam mentor at Dreams Virtual Academy.\n\nپنهنجو ڪو به سائنس يا ٽيسٽ بابت سوال سنڌي، اردو يا انگلش ۾ پڇو!',
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Clean up speech synthesis when component unmounts or drawer closes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
      }
    };
  }, []);

  const handleStopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  }, []);

  const handleSpeakText = (msgId: string, rawText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      handleStopSpeech();
      return;
    }

    handleStopSpeech();

    // Clean markdown characters for pleasant vocalization
    const cleanSpeech = rawText
      .replace(/[*#_~`]/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95; // Natural instructional pace
    utterance.pitch = 1.0;

    // Detect language preference (Urdu / Hindi / English)
    const voices = window.speechSynthesis.getVoices();
    const isUrduOrSindhi = /[\u0600-\u06FF]/.test(cleanSpeech);

    if (isUrduOrSindhi) {
      const subVoice = voices.find((v) => v.lang.startsWith('ur') || v.lang.startsWith('hi'));
      if (subVoice) utterance.voice = subVoice;
    } else {
      const enVoice = voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Typewriter streaming effect for newly arrived AI messages
  const startTypewriterEffect = useCallback((fullText: string) => {
    const aiMsgId = `${Date.now()}-ai`;
    const initialMsg: Message = {
      id: aiMsgId,
      sender: 'ai',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTyping: true,
    };

    setMessages((prev) => [...prev, initialMsg]);

    let currentIndex = 0;
    const chunkSize = 3; // stream 3 characters per step for smooth rapid cadence

    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }

    typewriterTimerRef.current = setInterval(() => {
      currentIndex += chunkSize;
      if (currentIndex >= fullText.length) {
        if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMsgId ? { ...m, text: fullText, isTyping: false } : m))
        );
      } else {
        const nextPartial = fullText.slice(0, currentIndex);
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMsgId ? { ...m, text: nextPartial } : m))
        );
      }
    }, 18);
  }, []);

  const handleSendMessage = useCallback(async (textToSend?: string, context?: string, mode = 'ask') => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    handleStopSpeech();

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query.trim(),
          context: context || '',
          mode: mode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        startTypewriterEffect(data.reply);
      } else {
        const errorMsg: Message = {
          id: `${Date.now()}-error`,
          sender: 'ai',
          text: data.error || 'Maazrat! Server par masla aa gaya hai. Barah-e-karam dobara koshish karein.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: Message = {
        id: `${Date.now()}-error`,
        sender: 'ai',
        text: 'Internet connection ka masla hai. Please check your network and try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, handleStopSpeech, startTypewriterEffect]);

  // Listen for custom trigger events from anywhere on the web (e.g. from quiz or test review)
  useEffect(() => {
    const handleExternalTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string; context?: string; mode?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        handleSendMessage(customEvent.detail.prompt, customEvent.detail.context, customEvent.detail.mode);
      }
    };

    window.addEventListener('open-ustad-ai', handleExternalTrigger);
    return () => window.removeEventListener('open-ustad-ai', handleExternalTrigger);
  }, [handleSendMessage]);

  const handleClearChat = () => {
    handleStopSpeech();
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Chat history cleared. Salam! Ask me another question about STBB Science or STS / JST tests.',
        time: 'Just now',
      },
    ]);
  };

  // Simple formatter for markdown bold & bullets
  const formatText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} style={{ color: 'var(--text-dark, #4A3B2F)' }}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return (
          <li key={idx} style={{ marginLeft: '1.2rem', marginBottom: '0.3rem' }}>
            {formattedParts}
          </li>
        );
      }

      return (
        <p key={idx} style={{ margin: '0 0 0.45rem 0', minHeight: line.trim() ? 'auto' : '0.5rem' }}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <motion.button
          className={styles.floatingTrigger}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Ask Ustad AI"
        >
          <div className={styles.triggerPulse} />
          <Sparkles size={17} />
          <span>Ustad AI (استاد)</span>
        </motion.button>
      )}

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatDrawer}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            {/* Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.avatarBadge}>
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className={styles.headerTitle}>
                    Ustad AI
                    <span style={{ fontSize: '0.7rem', background: 'var(--accent, #7C5CFF)', color: '#FFFFFF', padding: '2px 7px', borderRadius: '4px', fontWeight: 800 }}>
                      GEMINI PRO
                    </span>
                  </h3>
                  <p className={styles.headerSubtitle}>توهان جو علمي رهبر (Science & Test Mentor)</p>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button className={styles.actionBtn} onClick={handleClearChat} title="Clear Chat" aria-label="Clear chat">
                  <Trash2 size={16} />
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => {
                    handleStopSpeech();
                    setIsOpen(false);
                  }}
                  title="Close"
                  aria-label="Close Ustad AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className={styles.messagesContainer}>
              {/* Welcome suggestion chips */}
              {messages.length === 1 && (
                <div className={styles.welcomeCard}>
                  <h4>
                    <BookOpen size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px', color: 'var(--accent, #7C5CFF)' }} />
                    Quick Science & Test Questions
                  </h4>
                  <p>Click any topic below to ask Ustad AI in Sindhi & English:</p>
                  <div className={styles.chipsGrid}>
                    {PRESET_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        className={styles.chipBtn}
                        onClick={() => handleSendMessage(chip.prompt)}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message History */}
              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.msgRow} ${msg.sender === 'user' ? styles.user : styles.ai}`}>
                  <div className={`${styles.msgBubble} ${msg.sender === 'user' ? styles.user : styles.ai}`}>
                    {formatText(msg.text)}
                    {msg.isTyping && <span className={styles.typingCursor} />}
                  </div>

                  {/* Meta Bar: Time + Voice Speaker Button */}
                  <div className={styles.msgMeta}>
                    <span>{msg.time}</span>
                    {msg.sender === 'ai' && !msg.isTyping && msg.text && (
                      <button
                        className={`${styles.speakBtn} ${speakingMsgId === msg.id ? styles.speaking : ''}`}
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        title={speakingMsgId === msg.id ? 'Stop Voice' : 'Listen with Audio Voice'}
                        aria-label="Listen with Audio Voice"
                      >
                        {speakingMsgId === msg.id ? (
                          <>
                            <Square size={11} fill="currentColor" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={12} />
                            <span>Listen (آواز)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Server loading indicator before typewriter begins */}
              {loading && (
                <div className={`${styles.msgRow} ${styles.ai}`}>
                  <div className={`${styles.msgBubble} ${styles.ai}`}>
                    <div className={styles.typingIndicator}>
                      <span style={{ fontSize: '0.82rem', marginRight: '6px', color: 'var(--text-light, #7A6A5C)' }}>
                        Ustad AI is thinking
                      </span>
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                      <div className={styles.dot} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Ask in Sindhi, Urdu or English... (سائنس يا ٽيسٽ جو سوال پڇو)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.inputField}
                disabled={loading}
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Utility helper to trigger Ustad AI from anywhere (e.g. from tests or quizzes)
 */
export function openUstadAi(prompt: string, context?: string, mode = 'explain_mcq') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-ustad-ai', {
        detail: { prompt, context, mode },
      })
    );
  }
}
