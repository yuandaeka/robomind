import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, QrCode, CreditCard as PaypalIcon, Landmark, CheckCircle, Shield, Copy, Check, Clock, AlertCircle, ChevronDown, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PaymentModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [step, setStep] = useState('select'); // select, processing, success
  const [trxId, setTrxId] = useState('');
  
  // Card Inputs State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardError, setCardError] = useState('');
  const [cardType, setCardType] = useState('unknown');

  // Paypal Inputs State
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [paypalStep, setPaypalStep] = useState('login'); // login, pay

  // Copy State
  const [copied, setCopied] = useState(false);

  // QRIS Timer
  const [timeLeft, setTimeLeft] = useState(120);

  // Bank Instruction Accordions
  const [activeAccordion, setActiveAccordion] = useState(0);

  // Generate Transaction ID on open
  useEffect(() => {
    if (isOpen) {
      const rand = Math.floor(100000 + Math.random() * 900000);
      setTrxId(`RBM-${rand}`);
      setStep('select');
      setSelectedMethod('card');
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setNameOnCard('');
      setCardError('');
      setCardType('unknown');
      setPaypalEmail('');
      setPaypalPassword('');
      setPaypalStep('login');
      setTimeLeft(120);
      setActiveAccordion(0);
    }
  }, [isOpen]);

  // Timer Effect for QRIS
  useEffect(() => {
    if (isOpen && selectedMethod === 'qris' && timeLeft > 0 && step === 'select') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedMethod, timeLeft, step]);

  // Card Type Detector
  useEffect(() => {
    const rawNumber = cardNumber.replace(/\s?/g, '');
    if (rawNumber.startsWith('4')) {
      setCardType('visa');
    } else if (rawNumber.match(/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/)) {
      setCardType('mastercard');
    } else if (rawNumber.startsWith('35')) {
      setCardType('jcb');
    } else {
      setCardType('unknown');
    }
  }, [cardNumber]);

  if (!isOpen || !plan) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText('8808' + trxId.replace(/\D/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startPaymentProcessing = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2800); // 2.8 seconds mock verifying payment with transitions
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length < 19) {
      setCardError(lang === 'en' ? 'Invalid card number' : 'Nomor kartu tidak valid');
      return;
    }
    if (expiry.length < 5) {
      setCardError(lang === 'en' ? 'Invalid expiry date' : 'Masa berlaku tidak valid');
      return;
    }
    if (cvv.length < 3) {
      setCardError(lang === 'en' ? 'Invalid CVV' : 'CVV tidak valid');
      return;
    }
    if (!nameOnCard) {
      setCardError(lang === 'en' ? 'Cardholder name is required' : 'Nama pemegang kartu harus diisi');
      return;
    }
    setCardError('');
    startPaymentProcessing();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          onClick={step === 'select' ? onClose : undefined}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.45 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl min-h-[600px] overflow-hidden border border-gray-150 flex flex-col md:flex-row z-10 font-outfit"
        >
          {step === 'select' && (
            <>
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 z-20 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition-all duration-200 cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Left Column - Order details (like Midtrans sidebar) */}
              <div className="w-full md:w-[35%] bg-slate-950 p-8 flex flex-col justify-between relative text-white overflow-hidden">
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-8">
                    <div className="bg-gradient-to-tr from-primary-400 to-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-500/30">
                      <Bot size={20} className="animate-pulse" />
                    </div>
                    <span className="font-fredoka text-xl font-bold tracking-wide">
                      Robo<span className="text-primary-400">Mind</span> Pay
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1.5">
                        {lang === 'en' ? 'Merchant' : 'Penyedia'}
                      </span>
                      <p className="text-sm font-bold text-slate-100">RoboMind Kids Education</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1.5">
                        {lang === 'en' ? 'Subscription Plan' : 'Paket Langganan'}
                      </span>
                      <p className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"></span>
                        {plan.name[lang]}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1.5">
                        {lang === 'en' ? 'Transaction ID' : 'ID Transaksi'}
                      </span>
                      <p className="text-xs font-mono font-bold text-slate-300 bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 inline-block">
                        {trxId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 relative z-10 mt-8 md:mt-0">
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1.5">
                    {lang === 'en' ? 'Total Payment' : 'Total Pembayaran'}
                  </span>
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                    {plan.price}
                  </p>
                  <div className="text-[10px] text-slate-400 mt-3.5 flex items-center gap-1.5 bg-slate-900/50 py-1.5 px-2.5 rounded-lg border border-slate-800/40">
                    <Shield size={12} className="text-emerald-400 shrink-0" />
                    <span>PCI-DSS Secured & Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Payment Channels & Form */}
              <div className="w-full md:w-[65%] flex flex-col bg-slate-50">
                {/* Method selector tabs */}
                <div className="flex border-b border-slate-200 overflow-x-auto bg-white">
                  {[
                    { id: 'card', icon: CreditCard, label: lang === 'en' ? 'Card' : 'Kartu' },
                    { id: 'qris', icon: QrCode, label: 'QRIS' },
                    { id: 'paypal', icon: PaypalIcon, label: 'PayPal' },
                    { id: 'va', icon: Landmark, label: 'Bank Transfer' }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = selectedMethod === tab.id;
                    return (
                      <button 
                        key={tab.id}
                        onClick={() => setSelectedMethod(tab.id)}
                        className={`flex-1 py-4 px-4 text-center font-bold text-xs flex items-center justify-center gap-2 border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive ? 'border-primary-500 text-primary-600 bg-slate-50/50' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50/20'}`}
                      >
                        <IconComponent size={14} className={isActive ? 'text-primary-500' : 'text-slate-400'} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Main panel content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[420px] md:max-h-[500px]">
                  <div className="flex-1">
                    {/* CREDIT / DEBIT CARD METHOD */}
                    {selectedMethod === 'card' && (
                      <form onSubmit={handleCardSubmit} className="space-y-4 max-w-md mx-auto">
                        {/* Live Card Preview */}
                        <div className="relative w-full h-44 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-6 text-white shadow-xl overflow-hidden mb-6 flex flex-col justify-between border border-slate-700/50">
                          <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-7 bg-amber-400/80 rounded-md opacity-80 shadow-md shadow-amber-400/10 flex items-center justify-center">
                              <div className="w-7 h-5 border border-amber-600/30 rounded" />
                            </div>
                            {cardType === 'visa' && <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-4 invert" alt="Visa" />}
                            {cardType === 'mastercard' && <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />}
                            {cardType === 'jcb' && <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/JCB_logo.svg" className="h-5" alt="JCB" />}
                            {cardType === 'unknown' && <span className="font-bold text-[9px] opacity-40 uppercase tracking-widest bg-white/10 py-1 px-2 rounded">Credit Card</span>}
                          </div>
                          
                          <div className="text-lg font-mono tracking-widest text-center py-2 text-slate-100">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div className="max-w-[70%]">
                              <span className="text-[8px] text-slate-400 block uppercase tracking-widest mb-0.5">Card Holder</span>
                              <span className="text-xs font-bold tracking-wide uppercase truncate block">
                                {nameOnCard || 'YOUR NAME'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[8px] text-slate-400 block uppercase tracking-widest mb-0.5">Expires</span>
                              <span className="text-xs font-bold font-mono block">
                                {expiry || 'MM/YY'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {cardError && (
                          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100 mb-2">
                            <AlertCircle size={14} className="shrink-0" />
                            {cardError}
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{lang === 'en' ? 'Card Number' : 'Nomor Kartu'}</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="4123 4567 8901 2345"
                              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-mono font-bold text-slate-700 tracking-wider text-sm shadow-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40">
                              <Lock size={12} />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{lang === 'en' ? 'Expiry Date' : 'Masa Berlaku'}</label>
                            <input 
                              type="text" 
                              value={expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-mono font-bold text-slate-700 text-center text-sm shadow-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">CVV</label>
                            <input 
                              type="password" 
                              value={cvv}
                              onChange={handleCvvChange}
                              placeholder="•••"
                              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-mono font-bold text-slate-700 text-center text-sm shadow-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{lang === 'en' ? 'Cardholder Name' : 'Nama Pemegang Kartu'}</label>
                          <input 
                            type="text" 
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            placeholder="JOHN DOE"
                            className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-bold text-slate-750 text-sm shadow-sm uppercase font-outfit"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full mt-6 py-4 bg-gradient-to-r from-primary-500 to-primary-650 hover:shadow-lg hover:shadow-primary-500/25 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-center text-sm"
                        >
                          {lang === 'en' ? 'Pay Securely' : 'Bayar Sekarang'}
                        </button>
                      </form>
                    )}

                    {/* QRIS METHOD */}
                    {selectedMethod === 'qris' && (
                      <div className="flex flex-col items-center justify-center py-2 space-y-4 max-w-sm mx-auto">
                        <div className="flex items-center gap-2 text-xs text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-full border border-red-100 animate-pulse">
                          <Clock size={12} />
                          <span>{lang === 'en' ? 'QR Code Expiring in:' : 'Masa berlaku QR:'} {formatTime(timeLeft)}</span>
                        </div>

                        {/* Professional QRIS Box */}
                        <div className="p-5 bg-white border border-slate-200/80 rounded-3xl shadow-md flex flex-col items-center relative overflow-hidden">
                          {/* Colored QRIS Logo */}
                          <div className="flex items-center justify-between w-full mb-3 px-1">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest font-mono">QRIS MOCK</span>
                            <span className="font-extrabold text-sm text-slate-800">RoboMind Pay</span>
                          </div>

                          <div className="relative p-2 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
                            {/* Scanning Animation bar */}
                            <div className="qris-scan-line" />
                            
                            {/* SVG QR Code */}
                            <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                              <rect width="100" height="100" fill="#ffffff"/>
                              {/* Outer Corners */}
                              <path d="M4 4h24v8H12v12H4V4zm64 0h24v24H88V12H76V4zM4 76h8v12h12v4H4V76zm84 0h8v24H76V88h12V76z" fill="#000000" />
                              {/* Inner Corners */}
                              <rect x="8" y="8" width="16" height="16" fill="#000000" />
                              <rect x="11" y="11" width="10" height="10" fill="#ffffff" />
                              <rect x="13" y="13" width="6" height="6" fill="#000000" />
                              
                              <rect x="76" y="8" width="16" height="16" fill="#000000" />
                              <rect x="79" y="11" width="10" height="10" fill="#ffffff" />
                              <rect x="81" y="13" width="6" height="6" fill="#000000" />

                              <rect x="8" y="76" width="16" height="16" fill="#000000" />
                              <rect x="11" y="79" width="10" height="10" fill="#ffffff" />
                              <rect x="13" y="81" width="6" height="6" fill="#000000" />
                              
                              {/* Central Indicator Logo */}
                              <rect x="38" y="38" width="24" height="24" rx="5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                              <circle cx="50" cy="50" r="7" fill="#10B981" />
                              <path d="M46.5 50l2.5 2.5 4.5-4.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                              {/* Matrix Pattern dots */}
                              <path d="M30 12h4M34 16h4M30 20h8M42 8h8v4h-8zm12 0h12v4H54zm16 0h4v4h-4zm-30 8h4v4h-4zm8 0h4v4h-4zm8 0h12v4H46zm16 0h4v4h-4zm-28 8h12v4H34zm16 0h4v4h-4zm8 0h4v4h-4zm8 0h8v4h-8z" fill="#000" />
                              <path d="M8 32h12v4H8zm20 0h12v4H28zm16 0h4v4h-4zm8 0h8v4h-8zm12 0h8v4H64zm12 0h16v4H76zM8 40h4v12H8zm8 0h12v4H16zm16 0h4v4h-32zm40 0h8v4h-8zm12 0h12v4H80zM24 48h4v4h-4zm8 0h4v4h-4zm24 0h12v4H56zm16 0h4v4h-4zm8 0h8v4h-8zm-64 8h12v4H8zm16 0h4v8H20zm12 0h4v4h-4zm8 0h12v4H40zm16 0h4v4h-4zm8 0h16v4H64zM8 68h24v4H8zm28 0h4v4h-4zm8 0h8v4h-8zm12 0h8v4H56zm12 0h8v4H68zm12 0h12v4H80z" fill="#000" />
                              <path d="M32 76h8v4h-8zm12 0h4v12h-4zm8 0h12v4H54zm16 0h8v4H70zm-30 8h4v4h-4zm12 0h4v4h-4zm12 0h8v4H60zm8 0h4v4h-4z" fill="#000" />
                            </svg>
                          </div>
                          <span className="text-[9px] text-slate-400 mt-2.5 font-mono font-bold tracking-widest bg-slate-50 py-1 px-3 border border-slate-100 rounded-md">NMID: ID102030405060</span>
                        </div>

                        <p className="text-xs text-slate-500 text-center leading-relaxed">
                          {lang === 'en' 
                            ? 'Scan the QRIS above with GoPay, OVO, Dana, LinkAja, or any mobile banking app.' 
                            : 'Pindai kode QRIS di atas menggunakan GoPay, OVO, Dana, LinkAja, atau aplikasi m-banking Anda.'}
                        </p>

                        <button 
                          onClick={startPaymentProcessing}
                          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-center text-sm"
                        >
                          {lang === 'en' ? 'Simulate Scan & Pay' : 'Simulasikan Pindai & Bayar'}
                        </button>
                      </div>
                    )}

                    {/* PAYPAL METHOD */}
                    {selectedMethod === 'paypal' && (
                      <div className="space-y-4 max-w-sm mx-auto">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                            {lang === 'en' ? 'Demo Sandbox' : 'Sandbox Demo'}
                          </span>
                        </div>

                        {paypalStep === 'login' ? (
                          <div className="space-y-3">
                            <p className="text-xs text-slate-500">
                              {lang === 'en' 
                                ? 'Authorize this purchase by logging in to your mock buyer account.' 
                                : 'Lakukan otorisasi pembelian dengan masuk ke akun demo pembeli PayPal Anda.'}
                            </p>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Email Address</label>
                              <input 
                                type="email" 
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                                placeholder="buyer@example.com"
                                className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-bold text-slate-700 text-sm shadow-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Password</label>
                              <input 
                                type="password" 
                                value={paypalPassword}
                                onChange={(e) => setPaypalPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none transition-all font-mono font-bold text-slate-700 text-sm shadow-sm"
                              />
                            </div>
                            <button 
                              onClick={() => {
                                if (paypalEmail && paypalPassword) setPaypalStep('pay');
                              }}
                              disabled={!paypalEmail || !paypalPassword}
                              className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center text-sm"
                            >
                              {lang === 'en' ? 'Log In' : 'Masuk'}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 space-y-3 font-outfit">
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <span>Payer Account</span>
                                <span>Funding Source</span>
                              </div>
                              <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                                <span className="truncate max-w-[180px]">{paypalEmail}</span>
                                <span>PayPal Balance</span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {lang === 'en' 
                                ? 'Authorize this payment now. You will be redirected back to RoboMind instantly.' 
                                : 'Berikan otorisasi pembayaran ini. Anda akan diarahkan kembali ke RoboMind secara langsung.'}
                            </p>

                            <div className="flex gap-3">
                              <button 
                                onClick={() => setPaypalStep('login')}
                                className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all cursor-pointer text-center text-xs"
                              >
                                {lang === 'en' ? 'Back' : 'Kembali'}
                              </button>
                              <button 
                                onClick={startPaymentProcessing}
                                className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center text-xs"
                              >
                                {lang === 'en' ? 'Authorize Payment' : 'Otorisasi Pembayaran'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* VIRTUAL ACCOUNT METHOD */}
                    {selectedMethod === 'va' && (
                      <div className="space-y-4 max-w-md mx-auto">
                        <h4 className="text-sm font-bold text-slate-800">
                          {lang === 'en' ? 'Select Bank Partner' : 'Pilih Mitra Bank'}
                        </h4>

                        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-600 text-white font-extrabold text-[9px] px-2 py-1 rounded">BCA</div>
                              <span className="text-xs font-bold text-slate-700">BCA Virtual Account</span>
                            </div>
                            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {lang === 'en' ? 'Automated' : 'Otomatis'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center py-3 border-y border-slate-150 border-dashed">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">VA Number</span>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-mono font-black text-slate-800 tracking-wider">
                                8808{trxId.replace(/\D/g, '')}
                              </span>
                              <button 
                                onClick={handleCopyVA}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors border border-slate-100"
                              >
                                {copied ? <Check size={14} className="text-green-600 animate-scale-up" /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Instruction Steps (Accordions) */}
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block mb-1">
                            {lang === 'en' ? 'Payment Guides' : 'Panduan Pembayaran'}
                          </span>
                          
                          {[
                            {
                              title: 'ATM BCA',
                              steps: lang === 'en' 
                                ? ['Insert card and enter PIN.', 'Select M-Transfer > BCA Virtual Account.', 'Enter the VA Number and confirm.', 'Complete payment.'] 
                                : ['Masukkan kartu ATM dan PIN Anda.', 'Pilih Transaksi Lainnya > Transfer > Ke Rekening BCA Virtual Account.', 'Masukkan nomor Virtual Account di atas.', 'Validasi nominal pembayaran lalu selesaikan.']
                            },
                            {
                              title: 'm-BCA (BCA Mobile)',
                              steps: lang === 'en' 
                                ? ['Log in to BCA Mobile.', 'Select m-Transfer > BCA Virtual Account.', 'Input the VA Number.', 'Check billing detail and enter PIN.'] 
                                : ['Masuk ke aplikasi BCA Mobile.', 'Pilih m-Transfer > BCA Virtual Account.', 'Masukkan nomor Virtual Account di atas.', 'Verifikasi rincian pembayaran, pilih kirim, lalu masukkan PIN m-BCA.']
                            }
                          ].map((guide, index) => {
                            const isCurrent = activeAccordion === index;
                            return (
                              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                                <button 
                                  type="button"
                                  onClick={() => setActiveAccordion(isCurrent ? -1 : index)}
                                  className="w-full p-4 flex justify-between items-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                  <span>{guide.title}</span>
                                  <ChevronDown size={14} className={`transform transition-transform ${isCurrent ? 'rotate-180' : ''}`} />
                                </button>
                                {isCurrent && (
                                  <div className="p-4 bg-slate-50 border-t border-slate-150 text-[11px] text-slate-500 leading-relaxed font-outfit space-y-2">
                                    <ol className="list-decimal pl-4 space-y-1.5">
                                      {guide.steps.map((st, i) => <li key={i}>{st}</li>)}
                                    </ol>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <button 
                          onClick={startPaymentProcessing}
                          className="w-full mt-4 py-4 bg-primary-500 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/20 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-center text-sm"
                        >
                          {lang === 'en' ? 'Simulate VA Bank Transfer' : 'Simulasikan Transfer Bank (VA)'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* STEP: PROCESSING / VERIFYING */}
          {step === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[500px] bg-slate-950 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-secondary-500/5 blur-xl pointer-events-none" />
              <div className="relative w-24 h-24 mb-8">
                {/* Visual Premium Loader */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-primary-400 border-b-secondary-400"
                />
                <div className="absolute inset-0 flex items-center justify-center text-primary-400">
                  <Lock size={28} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-fredoka text-slate-100 mb-3 tracking-wide uppercase">
                {lang === 'en' ? 'Verifying Transaction' : 'Memproses Transaksi'}
              </h3>
              <p className="text-slate-400 font-outfit max-w-sm text-xs leading-relaxed">
                {lang === 'en' 
                  ? 'Establishing a secure, encrypted connection to authorize payment details. Please wait...' 
                  : 'Menghubungkan ke jalur perbankan terenkripsi untuk memproses otorisasi pembayaran Anda. Mohon tunggu...'}
              </p>
            </div>
          )}

          {/* STEP: SUCCESS / RECEIPT */}
          {step === 'success' && (
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between min-h-[550px] bg-slate-50 relative">
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.15 }}
                  className="bg-emerald-100 text-emerald-500 p-4 rounded-full mb-5 shadow-lg shadow-emerald-500/10"
                >
                  <CheckCircle size={48} className="fill-emerald-100" />
                </motion.div>

                <h3 className="text-2xl font-bold font-fredoka text-slate-900 mb-2">
                  {lang === 'en' ? 'Payment Successful!' : 'Pembayaran Berhasil!'}
                </h3>
                
                <p className="text-slate-500 font-outfit max-w-md text-xs leading-relaxed mb-6">
                  {lang === 'en' 
                    ? 'Thank you! Your premium subscription is now active. You have full access to all cognitive logic modules.' 
                    : 'Terima kasih! Langganan premium Anda sekarang aktif. Anda memiliki akses penuh ke seluruh modul kognitif logika.'}
                </p>

                {/* Receipt Card */}
                <div className="w-full max-w-md bg-white border border-slate-200 shadow-md rounded-3xl p-6 text-left space-y-3 font-mono text-[11px] text-slate-600 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-400 via-emerald-400 to-secondary-400" />
                  
                  <div className="flex justify-between items-center font-bold text-slate-800 text-xs pb-3 border-b border-dashed border-slate-200">
                    <span>INVOICE RECEIPT</span>
                    <span>{trxId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'PAYMENT STATUS' : 'STATUS PEMBAYARAN'}</span>
                    <span className="text-emerald-600 font-extrabold uppercase tracking-wide">PAID (SUCCESS)</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'DATE/TIME' : 'WAKTU/TANGGAL'}</span>
                    <span className="font-bold text-slate-800">
                      {new Date().toLocaleString(lang === 'en' ? 'en-US' : 'id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'SUBSCRIBED PLAN' : 'PAKET BERLANGGANAN'}</span>
                    <span className="font-bold text-slate-800 uppercase">{plan.name[lang]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'METHOD' : 'METODE PEMBAYARAN'}</span>
                    <span className="font-bold text-slate-800 uppercase">
                      {selectedMethod === 'card' ? 'Credit/Debit Card' : selectedMethod.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-dashed border-slate-200 font-bold text-slate-900 text-xs">
                    <span>TOTAL AMOUNT</span>
                    <span className="text-primary-600 font-black text-sm">{plan.price}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  onSuccess(plan.id);
                  onClose();
                }}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-650 hover:shadow-lg hover:shadow-primary-500/20 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-center text-sm"
              >
                {lang === 'en' ? 'Start Adventure' : 'Mulai Petualangan'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* CSS Keyframes for Scan Animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
        .qris-scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #10B981, transparent);
          box-shadow: 0 0 10px #10B981;
          animation: scan 2s linear infinite;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default PaymentModal;
