export const nmapParser = (nmapOutput) => {
  console.log(nmapOutput)
  const lines = nmapOutput.split("\n")
  const tableStartIndex = lines.findIndex((line) =>
    line.includes("PORT    STATE SERVICE")
  )

  const tableData = lines
    .slice(tableStartIndex + 1)
    .map((line) => {
      const [port, state, service] = line.trim().split(/\s+/)

      if (port.endsWith("/tcp" || "/udp")) {
        return { port, state, service }
      }
      
return null
    })
    .filter((item) => item !== null) // Filtrer les éléments null

  if (!tableData.length || !lines.length) {return null}

  const nmapInfo = {
    startTime: lines[0].match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2} [A-Z]+/)?.[0],
    scanReport: lines[1].match(/Nmap scan report for (.+) \((.+)\)/)?.slice(1),
    hostStatus: lines[2].match(/Host is (.+)/)?.[1],
    latency: parseFloat(lines[2].match(/\((\d+\.\d+)s latency\)/)?.[1]),
    filteredPorts: parseInt(
      lines[3].match(/Not shown: (\d+) filtered tcp ports/)?.[1]
    ),
    scanDuration: parseFloat(
      lines[6].match(/scanned in (\d+\.\d+) seconds/)?.[1]
    ),
    tableData: tableData,
    nmapResult: nmapOutput,
  }

  return nmapInfo
}
