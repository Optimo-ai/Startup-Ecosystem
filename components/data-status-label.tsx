import React from "react"
import { AlertCircle, Zap } from "lucide-react"

interface DataStatusLabelProps {
  coverage: number
  label?: string
  compact?: boolean
}

export function DataStatusLabel({ coverage, label, compact = false }: DataStatusLabelProps) {
  if (coverage >= 0.7) {
    return null // No mostrar etiqueta si la cobertura es buena
  }

  const isProcessing = coverage < 0.3
  
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
        isProcessing 
          ? "bg-amber-50 text-amber-700 border border-amber-200"
          : "bg-blue-50 text-blue-700 border border-blue-200"
      }`}>
        {isProcessing ? (
          <>
            <Zap className="w-3 h-3" />
            <span>Data en proceso</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-3 h-3" />
            <span>Cobertura limitada</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`rounded-lg p-4 border ${
      isProcessing
        ? "bg-amber-50 border-amber-200"
        : "bg-blue-50 border-blue-200"
    }`}>
      <div className="flex items-start gap-3">
        {isProcessing ? (
          <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`font-semibold ${
            isProcessing ? "text-amber-900" : "text-blue-900"
          }`}>
            {isProcessing ? "Data en proceso de actualización" : "Cobertura de datos limitada"}
          </p>
          <p className={`text-sm mt-1 ${
            isProcessing ? "text-amber-700" : "text-blue-700"
          }`}>
            {isProcessing
              ? `${(coverage * 100).toFixed(0)}% de datos disponibles. Esta visualización se mejorará cuando se completen más registros.`
              : `${(coverage * 100).toFixed(0)}% de disponibilidad. Los datos recopilados representan la información verificada disponible.`
            }
          </p>
        </div>
      </div>
    </div>
  )
}
