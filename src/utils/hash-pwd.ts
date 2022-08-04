import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'd1d2122d212d21d 21d21d21d21d21d2121 21d12d21d12d12d12d21d f434ff31d1',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
