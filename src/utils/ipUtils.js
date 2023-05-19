export function isIpv4(ipAddress) {
  const ipParts = ipAddress.split(".")

  if (ipParts.length !== 4) {
    return false
  }

  for (let i = 0; i < ipParts.length; i++) {
    const part = ipParts[i]
    const num = Number(part)

    if (isNaN(num) || num < 0 || num > 255) {
      return false
    }
  }

  
return true
}
