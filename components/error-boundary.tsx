"use client"

import { ReactNode, Component, ReactElement } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactElement
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900">Terjadi Kesalahan</h3>
                <p className="text-sm text-red-700 mt-1">
                  Maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman untuk coba lagi.
                </p>
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <pre className="mt-3 text-xs bg-red-100 p-3 rounded overflow-auto text-red-900">
                    {this.state.error.message}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
