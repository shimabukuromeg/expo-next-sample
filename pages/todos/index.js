import React, { useState } from "react"
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
  Button,
  Modal,
  FormControl,
  Actionsheet,
  Spacer,
  useDisclose,
} from "native-base"
import { Feather, Entypo } from "@expo/vector-icons"
import { useRouter } from 'next/router';

export function ActionsheetExample() {
  const { isOpen, onOpen, onClose } = useDisclose()
  return (
    <>
      <Button onPress={onOpen}>Actionsheet</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

export const ExampleButton = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export const Example = () => {
  const router = useRouter();
  const instState = [
    {
      title: "Code",
      isCompleted: true,
    },
    {
      title: "Meeting with team at 9",
      isCompleted: false,
    },
    {
      title: "Check Emails",
      isCompleted: false,
    },
    {
      title: "Write an article",
      isCompleted: false,
    },
  ]
  const [list, setList] = React.useState(instState)
  const [inputValue, setInputValue] = React.useState("")

  const addItem = (title: string) => {
    setList([
      ...list,
      {
        title: title,
        isCompleted: false,
      },
    ])
  }

  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index)
    setList(temp)
  }

  const handleStatusChange = (index: number) => {
    const temp = list.map((item, itemI) =>
      itemI !== index ? item : { ...item, isCompleted: !item.isCompleted }
    )
    setList(temp)
  }

  return (
    <Box>
      <Heading >TODO</Heading>
      <VStack mb="5" space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Task"
          />
          <IconButton
            borderRadius="sm"
            variant="solid"
            icon={
              <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
            }
            onPress={() => {
              addItem(inputValue)
              setInputValue("")
            }}
          />
        </HStack>
        <VStack space={2}>
          {list.map((item, itemI) => (
            <HStack
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              key={item.title + itemI.toString()}
            >
              <Checkbox
                isChecked={item.isCompleted}
                onChange={() => handleStatusChange(itemI)}
                value={item.title}
              >
                <Text
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                >
                  {item.title}
                </Text>
              </Checkbox>
              <IconButton
                size="sm"
                colorScheme="trueGray"
                icon={
                  <Icon
                    as={Entypo}
                    name="minus"
                    size="xs"
                    color="trueGray.400"
                  />
                }
                onPress={() => handleDelete(itemI)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
      <ExampleButton />
      <Spacer h="10px" />
      <ActionsheetExample />
      <Spacer h="10px" />
      <Button onPress={() => {
        router.push('/')
      }}>TOP</Button>
    </Box>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}
