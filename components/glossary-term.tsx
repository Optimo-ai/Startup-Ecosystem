import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface GlossaryTermProps {
  term: string
  definition: string
  className?: string
}

export function GlossaryTerm({ term, definition, className = "" }: GlossaryTermProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1 cursor-help border-b border-dotted border-[#2596be] hover:border-[#84be64] transition-colors ${className}`}>
            {term}
            <HelpCircle className="w-3.5 h-3.5 text-[#2596be] hover:text-[#84be64] transition-colors" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-gradient-to-r from-[#2596be] to-[#84be64] text-white border-0 max-w-xs">
          <p className="text-sm leading-relaxed">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
