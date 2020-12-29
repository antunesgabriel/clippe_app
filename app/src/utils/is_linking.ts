export const isLinking = (link: string) => {
  if (/\s+/gi.test(link)) {
    return false;
  }

  const res = link.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );

  return res !== null;
};

export const normalizeLink = (link: string) => {
  const regex = /http(s)?:\/\//gi;

  if (!regex.test(link)) {
    return `https://${link}`;
  }

  return link;
};
