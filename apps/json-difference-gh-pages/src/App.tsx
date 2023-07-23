// Packages
import { useState, useMemo } from 'react'
import { Box, Heading, Container, Text, Button, Stack, Grid, GridItem, Textarea } from '@chakra-ui/react'
import Editor from 'react-monaco-editor'
import { getDiff } from 'json-difference'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'

const oldJsonExample = `{ "foo": { "bar": "true" } }`
const newJsonExample = `{ "foo": { } }`

const App = () => {
  const [oldJson, setOldJson] = useState('{}')
  const [newJson, setNewJson] = useState('{}')
  const delta = useMemo(() => {
    try {
      const oldJsonParsed = JSON.parse(oldJson)
      const newJsonParsed = JSON.parse(newJson)

      const delta = getDiff(oldJsonParsed, newJsonParsed)

      return JSON.stringify(delta, null, 2)
    } catch (error) {
      return JSON.stringify(error, null, 2)
    }
  }, [oldJson, newJson])

  const handleClearClick = () => {
    setOldJson('')
    setNewJson('')
  }

  const handleAddExample = () => {
    setOldJson(oldJsonExample)
    setNewJson(newJsonExample)
  }

  return (
    <>
      <Container maxW={'12xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 12 }} py={{ base: 20, md: 4 }}>
          <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }} lineHeight={'110%'}>
            Make Diff with
            <br />
            <Text as={'span'} color={'green.400'}>
              JSON Difference
            </Text>
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap="1">
            <GridItem w="100%">
              <Editor width="100%" height="350" language="json" theme="vs-dark" onChange={setOldJson} value={oldJson} />
            </GridItem>
            <GridItem w="100%">
              <Editor width="100%" height="350" language="json" theme="vs-dark" onChange={setNewJson} value={newJson} />
            </GridItem>
            <GridItem w="100%">
              <Textarea rows={12} value={delta} placeholder="Here is a sample placeholder" />
            </GridItem>
            <GridItem w="100%">
              <Box pt={6}>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme={'green'}
                  bg={'green.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'green.500'
                  }}
                  onClick={handleAddExample}
                >
                  Add example
                </Button>
              </Box>
              <Box pt={5}>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme={'green'}
                  bg={'red.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'red.500'
                  }}
                  onClick={handleClearClick}
                >
                  Clear
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Stack>
      </Container>
    </>
  )
}

export default App
