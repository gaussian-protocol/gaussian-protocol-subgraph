import { BigInt } from "@graphprotocol/graph-ts/index"
import { Gaussian } from "../generated/schema"
import { TheGaussianProtocol, Transfer } from "../generated/TheGaussianProtocol/TheGaussianProtocol"

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId
  let gaussian = Gaussian.load(tokenId.toString())

  if (gaussian == null) {
    gaussian = new Gaussian(tokenId.toString())

    let contract = TheGaussianProtocol.bind(event.address)
    gaussian.name = "Gaussian #" + tokenId.toString()

    let numbers: Array<i32> = contract.getNumbers(tokenId).map<i32>((n: BigInt) => n.toI32())

    gaussian.first = numbers[0]
    gaussian.second = numbers[1]
    gaussian.third = numbers[2]
    gaussian.fourth = numbers[3]
    gaussian.fifth = numbers[4]
    gaussian.sixth = numbers[5]
    gaussian.seventh = numbers[6]
    gaussian.eighth = numbers[7]
    gaussian.metadataURI = contract.tokenURI(tokenId)
    gaussian.imageURI = contract.tokenSVG(tokenId)

    gaussian.numbers = numbers
    gaussian.creator = event.params.to
  }

  gaussian.owner = event.params.to
  gaussian.save()
}
