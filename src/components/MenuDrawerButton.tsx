import React from 'react'
import { IconButton } from 'react-native-paper'

interface MenuDrawerButtonProps {
  openDrawer: Function
}

function MenuDrawerButton({ openDrawer, ...props }: MenuDrawerButtonProps) {
  return (
    <IconButton
      color="white"
      icon="view-headline"
      onPress={() => openDrawer()}
    />
  )
}

export default MenuDrawerButton
