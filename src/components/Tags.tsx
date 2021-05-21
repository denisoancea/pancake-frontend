import React from 'react'
import {
  Tag,
  VerifiedIcon,
  CommunityIcon,
  BinanceIcon,
  RefreshIcon,
  AutoRenewIcon,
  TagProps,
  TimerIcon,
  BlockIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const CoreTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="secondary" outline startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {t('Core')}
    </Tag>
  )
}

const CommunityTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="failure" outline startIcon={<CommunityIcon width="18px" color="failure" mr="4px" />} {...props}>
      {t('Community')}
    </Tag>
  )
}

const BinanceTag: React.FC<TagProps> = (props) => {
  return (
    <Tag variant="binance" outline startIcon={<BinanceIcon width="18px" color="secondary" mr="4px" />} {...props}>
      Binance
    </Tag>
  )
}

const DualTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textSubtle" outline {...props}>
      {t('Dual')}
    </Tag>
  )
}

const ManualPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="secondary" outline startIcon={<RefreshIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {t('Manual')}
    </Tag>
  )
}

const CompoundingPoolTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Auto')}
    </Tag>
  )
}

const VoteNowTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="success" startIcon={<VerifiedIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Vote Now')}
    </Tag>
  )
}

const SoonTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="binance" startIcon={<TimerIcon width="18px" color="success" mr="4px" />} {...props}>
      {t('Soon')}
    </Tag>
  )
}

const ClosedTag: React.FC<TagProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tag variant="textDisabled" startIcon={<BlockIcon width="18px" color="textDisabled" mr="4px" />} {...props}>
      {t('Closed')}
    </Tag>
  )
}

export { CoreTag, CommunityTag, BinanceTag, DualTag, ManualPoolTag, CompoundingPoolTag, VoteNowTag, SoonTag, ClosedTag }
