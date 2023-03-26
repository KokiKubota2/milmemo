import _ from 'lodash'

import { Box, Stack } from 'components/mui/material'

import { DrankMilkCard } from 'app'

const C: React.FC<{ milks: MilkProps[] | undefined }> = ({ milks }) => (
  <Box>
    <Stack spacing={2}>
      {_.map(milks, (milk) => (
        <DrankMilkCard {...{ ...milk }} key={milk.id} />
      ))}
    </Stack>
  </Box>
)

export default C
