import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, QrCode, CreditCard as PaypalIcon, Landmark, CheckCircle, Shield, Copy, Check, Clock, AlertCircle } from 'lucide-react';
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

  // Paypal Inputs State
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [paypalStep, setPaypalStep] = useState('login'); // login, pay

  // Copy State
  const [copied, setCopied] = useState(false);

  // QRIS Timer
  const [timeLeft, setTimeLeft] = useState(120);

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
      setPaypalEmail('');
      setPaypalPassword('');
      setPaypalStep('login');
      setTimeLeft(120);
    }
  }, [isOpen]);

  // Timer Effect for QRIS
  useEffect(() => {
    if (isOpen && selectedMethod === 'qris' && timeLeft > 0 && step === 'select') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedMethod, timeLeft, step]);

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
    }, 2500); // 2.5 seconds mock verifying payment
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={step === 'select' ? onClose : undefined}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl min-h-[550px] overflow-hidden border border-gray-100 flex flex-col md:flex-row z-10 font-outfit"
        >
          {step === 'select' && (
            <>
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 z-20 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              {/* Left Column - Order details (like Midtrans sidebar) */}
              <div className="w-full md:w-[35%] bg-slate-50 p-6 md:p-8 border-r border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-primary-500 p-1.5 rounded-lg text-white">
                      <Landmark size={18} />
                    </div>
                    <span className="font-fredoka text-lg font-bold text-gray-800 tracking-wide">
                      Robo<span className="text-primary-500">Mind</span> Pay
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        {lang === 'en' ? 'Merchant' : 'Penyedia'}
                      </span>
                      <p className="text-sm font-bold text-gray-800">RoboMind Kids Education</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        {lang === 'en' ? 'Subscription Plan' : 'Paket Langganan'}
                      </span>
                      <p className="text-base font-bold text-gray-800 flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-500"></span>
                        {plan.name[lang]}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        {lang === 'en' ? 'Transaction ID' : 'ID Transaksi'}
                      </span>
                      <p className="text-sm font-mono font-bold text-gray-700">{trxId}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 mt-6 md:mt-0">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                    {lang === 'en' ? 'Total Payment' : 'Total Pembayaran'}
                  </span>
                  <p className="text-2xl font-extrabold text-primary-600">{plan.price}</p>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <Shield size={12} className="text-green-500 shrink-0" />
                    {lang === 'en' ? 'Secured by AES-256 Encryption' : 'Ditegakkan dengan Enkripsi AES-256'}
                  </p>
                </div>
              </div>

              {/* Right Column - Payment Channels & Form */}
              <div className="w-full md:w-[65%] flex flex-col">
                {/* Method selector tabs */}
                <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/50">
                  <button 
                    onClick={() => setSelectedMethod('card')}
                    className={`flex-1 py-4 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${selectedMethod === 'card' ? 'border-primary-500 text-primary-600 bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    <CreditCard size={16} />
                    {lang === 'en' ? 'Credit/Debit Card' : 'Kartu Kredit/Debit'}
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('qris')}
                    className={`flex-1 py-4 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${selectedMethod === 'qris' ? 'border-primary-500 text-primary-600 bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    <QrCode size={16} />
                    QRIS
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('paypal')}
                    className={`flex-1 py-4 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${selectedMethod === 'paypal' ? 'border-primary-500 text-primary-600 bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    <PaypalIcon size={16} />
                    PayPal
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('va')}
                    className={`flex-1 py-4 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 border-b-2 transition-all whitespace-nowrap ${selectedMethod === 'va' ? 'border-primary-500 text-primary-600 bg-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    <Landmark size={16} />
                    {lang === 'en' ? 'Virtual Account' : 'Akun Virtual'}
                  </button>
                </div>

                {/* Main panel content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[400px] md:max-h-none">
                  <div className="flex-1">
                    {/* CREDIT / DEBIT CARD METHOD */}
                    {selectedMethod === 'card' && (
                      <form onSubmit={handleCardSubmit} className="space-y-4">
                        <h4 className="text-base font-bold text-gray-800 mb-2">
                          {lang === 'en' ? 'Enter Card Details' : 'Masukkan Detail Kartu'}
                        </h4>
                        
                        {cardError && (
                          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                            <AlertCircle size={16} />
                            {cardError}
                          </div>
                        )}

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 font-bold">{lang === 'en' ? 'CARD NUMBER' : 'NOMOR KARTU'}</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="4123 4567 8901 2345"
                              className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-mono font-bold text-gray-700 tracking-wider text-sm sm:text-base"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-60">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-4" alt="Visa" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-bold">{lang === 'en' ? 'EXPIRY DATE' : 'MASA BERLAKU'}</label>
                            <input 
                              type="text" 
                              value={expiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-mono font-bold text-gray-700 text-center text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-bold">CVV</label>
                            <input 
                              type="password" 
                              value={cvv}
                              onChange={handleCvvChange}
                              placeholder="123"
                              className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-mono font-bold text-gray-700 text-center text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 font-bold">{lang === 'en' ? 'CARDHOLDER NAME' : 'NAMA DI KARTU'}</label>
                          <input 
                            type="text" 
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            placeholder="John Doe"
                            className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-bold text-gray-700 text-sm"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full mt-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all cursor-pointer text-center"
                        >
                          {lang === 'en' ? 'Confirm Payment' : 'Konfirmasi Pembayaran'}
                        </button>
                      </form>
                    )}

                    {/* QRIS METHOD */}
                    {selectedMethod === 'qris' && (
                      <div className="flex flex-col items-center justify-center py-2 space-y-4">
                        <div className="flex items-center gap-2 text-xs text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-full">
                          <Clock size={14} />
                          <span>{lang === 'en' ? 'QR Code Expiring in:' : 'Masa berlaku QR:'} {formatTime(timeLeft)}</span>
                        </div>

                        {/* Mock SVG QR Code */}
                        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-inner flex flex-col items-center">
                          <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                            <rect width="100" height="100" fill="#f8fafc" rx="10"/>
                            {/* Outer Corners */}
                            <path d="M5 5h30v10H15v20H5V5zm60 0h30v30H85V15H65V5zM5 65h10v20h20v10H5V65zm80 0h10v30H65V85h20V65z" fill="#000" />
                            {/* Inner Corners */}
                            <path d="M12 12h16v16H12zM72 12h16v16H72zM12 72h16v16H12z" fill="#000" />
                            {/* Center Logo Area */}
                            <rect x="38" y="38" width="24" height="24" rx="6" fill="#fff" stroke="#000" strokeWidth="2" />
                            <circle cx="50" cy="50" r="8" fill="#10B981" />
                            <path d="M48 50l1.5 1.5 2.5-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Dummy Grid Points */}
                            <circle cx="45" cy="20" r="2" fill="#000" />
                            <circle cx="55" cy="20" r="2" fill="#000" />
                            <circle cx="50" cy="25" r="2" fill="#000" />
                            <circle cx="35" cy="45" r="2" fill="#000" />
                            <circle cx="35" cy="55" r="2" fill="#000" />
                            <circle cx="65" cy="45" r="2" fill="#000" />
                            <circle cx="65" cy="55" r="2" fill="#000" />
                            <circle cx="45" cy="80" r="2" fill="#000" />
                            <circle cx="55" cy="80" r="2" fill="#000" />
                            <circle cx="50" cy="75" r="2" fill="#000" />
                            <path d="M40 32h20M32 40v20" stroke="#000" strokeWidth="2" strokeDasharray="3 3" />
                          </svg>
                          <span className="text-[10px] text-gray-400 mt-2 font-mono font-bold tracking-widest">NMID: ID102030405060</span>
                        </div>

                        <p className="text-xs text-gray-500 text-center max-w-sm px-4 leading-relaxed">
                          {lang === 'en' 
                            ? 'Scan the QRIS code above using GoPay, OVO, Dana, LinkAja, or your mobile banking application.' 
                            : 'Pindai kode QRIS di atas menggunakan GoPay, OVO, Dana, LinkAja, atau aplikasi m-banking Anda.'}
                        </p>

                        <button 
                          onClick={startPaymentProcessing}
                          className="w-full max-w-sm py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer text-center"
                        >
                          {lang === 'en' ? 'Simulate Scan & Pay' : 'Simulasikan Pindai & Bayar'}
                        </button>
                      </div>
                    )}

                    {/* PAYPAL METHOD */}
                    {selectedMethod === 'paypal' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
                          <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">
                            {lang === 'en' ? 'Sandbox Mode' : 'Mode Demo'}
                          </span>
                        </div>

                        {paypalStep === 'login' ? (
                          <div className="space-y-3">
                            <p className="text-xs text-gray-500">
                              {lang === 'en' 
                                ? 'Log in with your PayPal buyer account to authorize this payment.' 
                                : 'Masuk dengan akun pembeli PayPal Anda untuk memberikan otorisasi pembayaran ini.'}
                            </p>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 font-bold">EMAIL ADDRESS</label>
                              <input 
                                type="email" 
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                                placeholder="buyer@example.com"
                                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-bold text-gray-700 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 font-bold">PASSWORD</label>
                              <input 
                                type="password" 
                                value={paypalPassword}
                                onChange={(e) => setPaypalPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-primary-500 focus:outline-none transition-all font-mono font-bold text-gray-700 text-sm"
                              />
                            </div>
                            <button 
                              onClick={() => {
                                if (paypalEmail && paypalPassword) setPaypalStep('pay');
                              }}
                              disabled={!paypalEmail || !paypalPassword}
                              className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center"
                            >
                              {lang === 'en' ? 'Log In' : 'Masuk'}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                              <div className="flex justify-between text-xs text-gray-500 font-bold mb-1">
                                <span>{lang === 'en' ? 'PAYER' : 'PEMBAYAR'}</span>
                                <span>{lang === 'en' ? 'FUNDING SOURCE' : 'SUMBER DANA'}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-gray-800">
                                <span>{paypalEmail}</span>
                                <span>PayPal Balance</span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {lang === 'en' 
                                ? 'By clicking "Pay Now", the payment will be completed and we will return you to RoboMind.' 
                                : 'Dengan mengklik "Bayar Sekarang", pembayaran akan diselesaikan dan kami akan mengembalikan Anda ke RoboMind.'}
                            </p>

                            <div className="flex gap-3">
                              <button 
                                onClick={() => setPaypalStep('login')}
                                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-center"
                              >
                                {lang === 'en' ? 'Back' : 'Kembali'}
                              </button>
                              <button 
                                onClick={startPaymentProcessing}
                                className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer text-center"
                              >
                                {lang === 'en' ? 'Pay Now' : 'Bayar Sekarang'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* VIRTUAL ACCOUNT METHOD */}
                    {selectedMethod === 'va' && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-800">
                          {lang === 'en' ? 'Bank Transfer (Automatic Verification)' : 'Transfer Bank (Verifikasi Otomatis)'}
                        </h4>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-bold">BANK</span>
                            <span className="text-sm font-extrabold text-blue-600">BCA VIRTUAL ACCOUNT</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-y border-gray-200/50">
                            <span className="text-xs text-gray-400 font-bold">{lang === 'en' ? 'VA NUMBER' : 'NOMOR VA'}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-mono font-extrabold text-gray-800">
                                8808{trxId.replace(/\D/g, '')}
                              </span>
                              <button 
                                onClick={handleCopyVA}
                                className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 hover:text-gray-800 transition-colors"
                              >
                                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-gray-500">
                          <span className="font-bold text-gray-700">{lang === 'en' ? 'Payment Steps:' : 'Cara Pembayaran:'}</span>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>{lang === 'en' ? 'Open your m-BCA app or go to your nearest ATM.' : 'Buka aplikasi m-BCA atau pergi ke ATM terdekat.'}</li>
                            <li>{lang === 'en' ? 'Select M-Transfer > BCA Virtual Account.' : 'Pilih M-Transfer > BCA Virtual Account.'}</li>
                            <li>{lang === 'en' ? 'Input the Virtual Account number above.' : 'Masukkan nomor Virtual Account di atas.'}</li>
                            <li>{lang === 'en' ? 'Check details (amount matches, recipient is RoboMind).' : 'Periksa detail (nominal sesuai, penerima RoboMind).'}</li>
                            <li>{lang === 'en' ? 'Confirm and enter your PIN.' : 'Konfirmasi dan masukkan PIN Anda.'}</li>
                          </ol>
                        </div>

                        <button 
                          onClick={startPaymentProcessing}
                          className="w-full mt-4 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all cursor-pointer text-center"
                        >
                          {lang === 'en' ? 'Simulate VA Bank Transfer Payment' : 'Simulasikan Pembayaran Transfer Bank (VA)'}
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
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[500px]">
              <div className="relative w-20 h-20 mb-6">
                {/* Loader animation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="w-20 h-20 rounded-full border-4 border-primary-200 border-t-primary-500"
                />
                <div className="absolute inset-0 flex items-center justify-center text-primary-500 font-bold">
                  <Landmark size={24} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-fredoka text-gray-900 mb-2">
                {lang === 'en' ? 'Verifying Payment' : 'Memverifikasi Pembayaran'}
              </h3>
              <p className="text-gray-500 font-outfit max-w-sm text-sm">
                {lang === 'en' 
                  ? 'Please do not close this window. We are confirming your transaction with the financial network.' 
                  : 'Mohon tidak menutup jendela ini. Kami sedang mengonfirmasi transaksi Anda dengan jaringan finansial.'}
              </p>
            </div>
          )}

          {/* STEP: SUCCESS / RECEIPT */}
          {step === 'success' && (
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between min-h-[500px]">
              <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                  className="bg-green-100 text-green-500 p-4 rounded-full mb-6"
                >
                  <CheckCircle size={56} className="fill-green-100" />
                </motion.div>

                <h3 className="text-2xl font-bold font-fredoka text-gray-900 mb-2">
                  {lang === 'en' ? 'Subscription Successful!' : 'Langganan Berhasil!'}
                </h3>
                
                <p className="text-gray-500 font-outfit max-w-md text-sm mb-6">
                  {lang === 'en' 
                    ? 'Congratulations! Your child\'s profile is now upgraded to Premium. Start exploring the world of coding logic!' 
                    : 'Selamat! Akun anak Anda sekarang telah ditingkatkan ke level Premium. Mulai jelajahi dunia logika coding!'}
                </p>

                {/* Receipt Card */}
                <div className="w-full max-w-md bg-slate-50 border border-gray-100 rounded-3xl p-6 text-left space-y-3 font-mono text-xs text-gray-600 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
                  
                  <div className="flex justify-between items-center font-bold text-gray-800 text-sm pb-2 border-b border-dashed border-gray-200">
                    <span>INVOICE RECEIPT</span>
                    <span>{trxId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'PAYMENT STATUS' : 'STATUS PEMBAYARAN'}</span>
                    <span className="text-green-600 font-bold uppercase">PAID (SUCCESS)</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'DATE/TIME' : 'WANGTU/TANGGAL'}</span>
                    <span className="font-bold text-gray-800">
                      {new Date().toLocaleString(lang === 'en' ? 'en-US' : 'id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'SUBSCRIBED PLAN' : 'PAKET BERLANGGANAN'}</span>
                    <span className="font-bold text-gray-800 uppercase">{plan.name[lang]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{lang === 'en' ? 'METHOD' : 'METODE PEMBAYARAN'}</span>
                    <span className="font-bold text-gray-800 uppercase">
                      {selectedMethod === 'card' ? 'Visa/Mastercard' : selectedMethod.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-dashed border-gray-200 font-bold text-gray-850 text-sm">
                    <span>TOTAL AMOUNT</span>
                    <span className="text-primary-600">{plan.price}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  onSuccess(plan.id);
                  onClose();
                }}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer text-center"
              >
                {lang === 'en' ? 'Start Adventure' : 'Mulai Petualangan'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
