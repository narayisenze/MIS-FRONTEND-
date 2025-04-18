import {
  ReactNode,
  CSSProperties,
} from 'react'
export interface Data {
  [key: string]: any;
}

export interface CommonProps {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}
