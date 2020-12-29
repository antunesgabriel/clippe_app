import {StyleService} from '@ui-kitten/components';

const styles = StyleService.create({
  body: {
    height: 42,
    alignSelf: 'flex-end',
    backgroundColor: '#F4F4F4',
    flex: 0,
    borderRadius: 23,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  touch: {
    height: 42,
    backgroundColor: '#F4F4F4',
    flex: 0,
    borderRadius: 23,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-500',
    marginLeft: 10,
  },

  icon: {
    height: 16.63,
    width: 16.63,
  },
});

export default styles;
