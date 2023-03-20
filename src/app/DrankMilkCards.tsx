import _ from 'lodash'

import { Box, Stack } from 'components/mui/material'

import { DrankMilkCard } from 'app'

const C: React.FC<{ milks: { [id: string]: MilkProps } }> = ({ milks }) => (
  <Box>
    <Stack spacing={2}>
      {_.map(milks, (milk, id) => (
        <DrankMilkCard {...{ ...milk }} key={id} />
      ))}
    </Stack>
  </Box>
)

export default C
