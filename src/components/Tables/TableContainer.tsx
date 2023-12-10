import React, { ReactNode } from 'react'
import MainLoading from './MainLoading'
import { scrolledToEnd } from '../../utils/overflow'
import { LinearProgress } from '@mui/material'
import MuiTableContainer from '@mui/material/TableContainer'

interface TableContainerProps {
  isLoading?: boolean
  customLoading?: ReactNode
  children: ReactNode
  isEmpty?: boolean
  emptyFeedback?: ReactNode
  isSearching?: boolean
  isSearchContent?: ReactNode
  isEmptySearch?: boolean
  emptySearchFeedback?: ReactNode
  hasError?: boolean
  errorFeedback?: ReactNode
  onScrolledToEnd?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => unknown
  style?: React.CSSProperties
  contentHeight?: string | number
  isFetchingNextPage?: boolean
}
export function TableContainer({
  isLoading,
  customLoading,
  children,
  isEmpty,
  emptyFeedback,
  isSearching,
  isSearchContent,
  isEmptySearch,
  emptySearchFeedback,
  hasError,
  errorFeedback,
  contentHeight,
  style,
  onScrolledToEnd,
  isFetchingNextPage,
}: TableContainerProps) {
  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const isScrolledToEnd = scrolledToEnd(event)
    if (isScrolledToEnd && onScrolledToEnd) {
      onScrolledToEnd(event)
    }
  }

  if (isSearching) {
    if (isSearchContent) {
      return <>{isSearchContent}</>
    }
    return <></>
  }
  if (hasError) {
    if (errorFeedback) {
      return <> {errorFeedback}</>
    }
    return <></>
  }
  if (isLoading) {
    if (customLoading) {
      return <>{customLoading}</>
    }
    return <MainLoading />
  }
  if (isEmptySearch) {
    if (emptySearchFeedback) {
      return <>{emptySearchFeedback}</>
    }
    return <></>
  }

  if (isEmpty) {
    if (emptyFeedback) {
      return <>{emptyFeedback}</>
    }
    return <></>
  }
  return (
    <div
      onScroll={handleScroll}
      style={{
        height: contentHeight,
        overflow: 'auto',
        ...style,
      }}
    >
      <MuiTableContainer>{children}</MuiTableContainer>
      {isFetchingNextPage && <LinearProgress />}
    </div>
  )
}
