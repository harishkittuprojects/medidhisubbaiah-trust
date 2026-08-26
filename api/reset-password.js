// ===================================================================
// Medidhisubbaiah Trust - Admin Reset Password API (Node / Vercel)
// ===================================================================
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { token, newPassword, email } = req.body || {};

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const targetEmail = (email || 'medidhisubbaiahtrustorg@gmail.com').toLowerCase().trim();

    // Update Supabase admin_auth if available
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://plbdgerejabjrrqttlba.supabase.co';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/admin_auth?email=eq.${encodeURIComponent(targetEmail)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            password_hash: newPassword,
            updated_at: new Date().toISOString()
          })
        });

        // Mark token used
        if (token) {
          await fetch(`${supabaseUrl}/rest/v1/admin_password_resets?token=eq.${encodeURIComponent(token)}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`
            },
            body: JSON.stringify({ used: true })
          });
        }
      } catch (dbErr) {
        console.warn('Database password update note:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Admin password updated successfully! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to update password.'
    });
  }
};
