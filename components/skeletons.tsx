import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <Skeleton className="h-4 w-20 mb-4 bg-slate-700" />
              <Skeleton className="h-8 w-32 bg-slate-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-slate-700" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 bg-slate-700 mb-2" />
                  <Skeleton className="h-3 w-24 bg-slate-700" />
                </div>
                <Skeleton className="h-4 w-16 bg-slate-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function InvoiceListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="h-4 w-40 mb-2 bg-slate-700" />
                <Skeleton className="h-3 w-60 bg-slate-700" />
              </div>
              <Skeleton className="h-6 w-20 bg-slate-700 ml-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function InvoiceDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40 bg-slate-700" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2 bg-slate-700" />
              <Skeleton className="h-4 w-48 bg-slate-700" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-4 w-16 mb-2 bg-slate-700" />
                  <Skeleton className="h-5 w-32 bg-slate-700" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2 bg-slate-700" />
                  <Skeleton className="h-5 w-24 bg-slate-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-slate-700">
            <CardContent className="pt-6">
              <Skeleton className="h-10 w-full bg-slate-700 mb-3" />
              <Skeleton className="h-3 w-24 bg-slate-700" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
