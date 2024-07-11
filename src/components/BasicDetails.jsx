import React from 'react'

const BasicDetails = () => {
  return (
    <div
							style={{
								padding: "10px 20px",
							}}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center justify-center gap-[30px] flex-wrap"
						>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Paid To
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Debit
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Reference
								</h1>
							</div>
							<div
								style={{
									borderRadius: "6px",
									border: "1px solid #E5E7EB",
									background: "#5D7285",
									boxShadow:
										"0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
								}}
								className="min-w-[150px] min-h-[300px]"
							>
								<h1 className="text-center text-white">
									Comment
								</h1>
							</div>
						</div>
  )
}

export default BasicDetails
