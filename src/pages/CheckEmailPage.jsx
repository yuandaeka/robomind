import { Link } from 'react-router-dom'
import { Bot, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const CheckEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-white/50 text-center">
          <Link to="/" className="inline-block">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-primary-500/30">
              <Mail size={40} />
            </div>
          </Link>
          <h1 className="text-3xl font-fredoka font-bold text-gray-900 mb-2">Cek Email Anda</h1>
          <p className="text-gray-500 font-outfit text-sm mb-8">
            Kami telah mengirim tautan konfirmasi ke email Anda. Silakan cek inbox (atau folder spam) dan klik tautan untuk mengaktifkan akun.
          </p>
          <Link
            to="/login"
            className="inline-block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-outfit font-bold shadow-md shadow-primary-500/30 hover:shadow-lg transition-all"
          >
            Kembali ke Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default CheckEmailPage
