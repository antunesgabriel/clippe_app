import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import {ClipItem} from 'src/services/clip.service';
import {useClip} from 'src/hooks/useClip';
import {addToast} from 'src/utils/addToast';
import {isLinking, normalizeLink} from 'src/utils/is_linking';

import styles from './card.styles';

type CardProps = {
  clip: ClipItem;
};

const Card: React.FC<CardProps> = ({clip}) => {
  const {actionDestroy} = useClip();

  const navigation = useNavigation();

  const onPressDelete = async () => {
    await actionDestroy(clip.id, callBack);
  };

  const onPressEdit = async (item: ClipItem) => {
    navigation &&
      navigation.navigate('Clip', {
        ...item,
      });
  };

  const callBack = (err = '', suc = false): void => {
    if (err) {
      return addToast('Erro', err, 'error');
    }

    if (suc) {
      addToast('Concluído', 'Clip excluido com sucesso!', 'info');
    }
  };

  const onPressLink = async () => {
    try {
      const link = normalizeLink(clip.content);

      await Linking.openURL(link);
    } catch (_) {
      addToast('Ops!', 'Falha ao tentar abrir o link', 'error');
    }
  };

  const cardStyles = useStyleSheet(styles);
  return (
    <Layout style={cardStyles.container}>
      <Layout style={cardStyles.info}>
        <Text category="h5" style={cardStyles.title}>
          {clip.title}
        </Text>
        {isLinking(clip.content) ? (
          <Text style={cardStyles.link} onPress={onPressLink}>
            {clip.content}
          </Text>
        ) : (
          <Text>{clip.content}</Text>
        )}
      </Layout>
      <Layout level="4" style={cardStyles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={cardStyles.touch}
          onPress={onPressDelete}>
          <Icon style={cardStyles.icon} name="trash-2-outline" fill="#EB4D4B" />
        </TouchableOpacity>

        <Layout style={cardStyles.dateWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={cardStyles.touch}
            onPress={() => onPressEdit(clip)}>
            <Icon
              style={cardStyles.iconDate}
              name="edit-2-outline"
              fill="#636E72"
            />
          </TouchableOpacity>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Card;
