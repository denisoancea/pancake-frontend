import React from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, LinkExternal, Text } from '@pancakeswap/uikit'
import { Proposal } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBscScanAddressUrl, getBscScanBlockNumberUrl } from 'utils/bscscan'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import { IPFS_GATEWAY } from '../config'

interface DetailsProps {
  proposal: Proposal
}

const Details: React.FC<DetailsProps> = ({ proposal }) => {
  const { t } = useTranslation()

  return (
    <Card mb="16px">
      <CardHeader>
        <Heading as="h3" scale="md">
          {t('Details')}
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex alignItems="center" mb="8px">
          <Text color="textSubtle">{t('Identifier')}</Text>
          <LinkExternal href={`${IPFS_GATEWAY}/${proposal.id}`} ml="8px">
            {proposal.id.slice(0, 8)}
          </LinkExternal>
        </Flex>
        <Flex alignItems="center" mb="8px">
          <Text color="textSubtle">{t('Creator')}</Text>
          <LinkExternal href={getBscScanAddressUrl(proposal.author)} ml="8px">
            {truncateWalletAddress(proposal.author)}
          </LinkExternal>
        </Flex>
        <Flex alignItems="center">
          <Text color="textSubtle">{t('Snaphot')}</Text>
          <LinkExternal href={getBscScanBlockNumberUrl(proposal.snapshot)} ml="8px">
            {proposal.snapshot}
          </LinkExternal>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Details
