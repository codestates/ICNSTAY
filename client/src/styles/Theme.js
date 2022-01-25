const deviceSize = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1240px',
  big: '2560px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSize.mobile})`,
  tablet: `screen and (max-width: ${deviceSize.tablet})`,
  laptop: `screen and (max-width: ${deviceSize.laptop})`,
  big: `screen and (max-width: ${deviceSize.big})`,
};

export default {
  grey: '#c4c4c4',
  black: '#141414',
  device,
};
