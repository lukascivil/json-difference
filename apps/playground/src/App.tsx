// Packages
import { useState, useMemo } from 'react'
import { Box, Heading, Container, Text, Button, Stack, Grid, GridItem, Textarea } from '@chakra-ui/react'
import Editor from 'react-monaco-editor'
import { getDiff } from '@json-difference'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'

const oldJsonExample = `{ "foo": { "bar": "true" } }`
const newJsonExample = `{ "foo": { } }`

const App = () => {
  const [oldJson, setOldJson] = useState('{}')
  const [newJson, setNewJson] = useState('{}')
  const result = useMemo(() => {
    try {
      const oldJsonParsed = JSON.parse(oldJson)
      const newJsonParsed = JSON.parse(newJson)

      const delta = getDiff(oldJsonParsed, newJsonParsed)

      return {
        delta: JSON.stringify(delta, null, 2),
        added: Object.keys(delta.added).length,
        removed: Object.keys(delta.removed).length,
        edited: Object.keys(delta.edited).length
      }
    } catch (error) {
      return
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
        <Stack as={Box} spacing={{ base: 8, md: 12 }} py={{ base: 20, md: 4 }}>
          <Heading fontWeight={600} textAlign={'center'} fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }} lineHeight={'110%'}>
            Make Diff with Playground
            <br />
            <Text as={'span'} color={'green.400'}>
              JSON Difference
            </Text>
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap="1">
            <GridItem w="100%">
              <Text>Original JSON</Text>
              <Editor width="100%" height="300" language="json" theme="vs-dark" onChange={setOldJson} value={oldJson} />
            </GridItem>
            <GridItem w="100%">
              <Text>Modified JSON</Text>
              <Editor width="100%" height="300" language="json" theme="vs-dark" onChange={setNewJson} value={newJson} />
            </GridItem>
            <GridItem w="100%">
              <Stack direction={['row']} spacing="12px">
                <Box w="100%">
                  <Text>Delta</Text>
                  <Textarea rows={12} value={result?.delta ?? ''} placeholder="Here is a sample placeholder" />
                </Box>
                <Box w="100%">
                  <Text>Summary</Text>
                  {result
                    ? `${result?.added} fields were added, ${result?.removed} removed and ${result?.edited} edited!`
                    : 'Add a struct to start.'}
                </Box>
              </Stack>
            </GridItem>
            <GridItem w="100%" textAlign={'center'}>
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
