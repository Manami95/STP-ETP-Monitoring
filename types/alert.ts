export type AlertType = 'info' | 'warning' | 'critical'

export interface Alert {
  id: string
  type: AlertType
  message: string
  timestamp: string
} 