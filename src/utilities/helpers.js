export const socialNetwork = url => {
  const tempUrl = url.trim();
  if (tempUrl.includes('facebook')) {
    return 'facebook';
  }

  if (tempUrl.includes('twitter')) {
    return 'twitter';
  }

  if (tempUrl.includes('instagram')) {
    return 'instagram';
  }
  if (tempUrl.includes('rss')) {
    return 'rss';
  }

  if (tempUrl.includes('google_plus')) {
    return 'google_plus';
  }
  return null;
};
