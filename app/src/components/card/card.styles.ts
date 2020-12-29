import {StyleService} from '@ui-kitten/components';

const styles = StyleService.create({
  container: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginVertical: 12,
    minHeight: 120,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 0,
    height: 'auto',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
  },

  title: {
    marginBottom: 6,
  },

  footer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    height: 17.71,
    width: 22.14,
  },

  iconDate: {
    height: 17.71,
    width: 22.14,
    marginRight: 3,
  },

  touch: {
    height: 24,
    width: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  link: {
    color: 'color-info-500',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'color-info-500',
  },
});

export default styles;
