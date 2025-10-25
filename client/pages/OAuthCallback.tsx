import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if OAuth was already processed
        const alreadyProcessed = sessionStorage.getItem('oauth_processed');
        if (alreadyProcessed) {
          console.log('🔄 OAuth already processed, redirecting...');
          const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard/customer';
          sessionStorage.removeItem('redirectAfterLogin');
          sessionStorage.removeItem('oauth_processed');
          navigate(redirectTo);
          return;
        }

        // Get tokens from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const error = urlParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          // Redirect to login with error
          navigate('/login?error=oauth_failed');
          return;
        }

        if (accessToken && refreshToken) {
          console.log('✅ OAuth login successful - storing tokens and updating auth state...');

          // Mark as processed to prevent double processing
          sessionStorage.setItem('oauth_processed', 'true');

          // Store tokens (same as regular login)
          console.log('💾 Storing tokens in localStorage...');
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // Clear URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);

          // Update AuthContext state
          console.log('🔄 Updating AuthContext state...');
          await refreshAuth();

          // Small delay for smooth transition
          setTimeout(() => {
            // Get redirect URL or default to dashboard
            const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/dashboard/customer';
            console.log('🔄 Navigating to:', redirectTo);
            sessionStorage.removeItem('redirectAfterLogin');
            sessionStorage.removeItem('oauth_processed');
            navigate(redirectTo);
          }, 1000);
        } else {
          console.error('Missing tokens in OAuth callback');
          navigate('/login?error=oauth_failed');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/login?error=oauth_failed');
      }
    };

    handleCallback();
  }, [navigate, refreshAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-0 shadow-2xl rounded-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            Welcome to BookMyLook!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 mb-6"
          >
            Signing you in with Google...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2 text-purple-600"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Completing sign in</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">
              You're being redirected to your dashboard. This may take a few seconds...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OAuthCallback;
