import { ok } from "assert";

import legacy_to_private_key from "../src/keys/legacy_to_private_key";
import legacy_to_public_key from "../src/keys/legacy_to_public_key";
import private_key_to_wif from "../src/keys/private_key_to_wif";
import public_key_from_private from "../src/keys/public_key_from_private_wif";
import public_key_to_wif from "../src/keys/public_key_to_wif";

it("public_key_from_private", async () => {
  const legacy_keys = [
    [
      "EOS5hwG4sTLMy5yx8CW1fLYWkoUG3TAmhdejCAMXEGKR2GRXwtoPx",
      "5K7xR2C8mBzMo4aMPJyBPp7Njc3XvszeJSfTApa51rc2d54rrd3",
    ],
    [
      "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
      "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
    ],
    [
      "EOS6hMLF2sPrxhu9SK4dJ9LaZimfzgfmP7uX1ahUPJUcUpS4p2G39",
      "5JWuEZQHLpUw8na4g8Fr99ZnPiuhtQjrvJLn6xBwUBnQmYBF3Z2",
    ],
    [
      "EOS7Jsktf3uiUxj6uXWDeGE92K7wHXoeRfKkyXCudUftigCucMkXv",
      "5HvQveqBrTYmvr4V73y7QNW51mY5ow2T9vzfKbz7egdHjXYNWkG",
    ],
    [
      "EOS7YqT9B3rw4WvQoAGzupzaGdeMthKUgyGjWQzUJM123WwQLjXBp",
      "5JbbGgbvnDNZrRqKzMWsDhAKCobRFVArgugZxLW9npfKRDAXuRJ",
    ],
    [
      "EOS87U41tTLiEjWX1S8GPAzaX48inKnJ4bnsSk6hGs1Cb3w72dHnQ",
      "5KjykvxKRaFj6CNzWHxecevXsdiFDPXka1aGVGHAFHtT6A1mfBz",
    ],
  ];
  const keys = await Promise.all(
    legacy_keys.map(async (key) => {
      return [
        await public_key_to_wif(legacy_to_public_key(key[0])),
        await private_key_to_wif(legacy_to_private_key(key[1])),
      ];
    })
  );
  const public_keys = await Promise.all(
    keys.map(([, k]) => public_key_from_private(k))
  );
  ok(public_keys[0] == keys[0][0], "Invalid public key 0");
  ok(public_keys[1] == keys[1][0], "Invalid public key 1");
  ok(public_keys[2] == keys[2][0], "Invalid public key 2");
  ok(public_keys[3] == keys[3][0], "Invalid public key 3");
  ok(public_keys[4] == keys[4][0], "Invalid public key 4");
  ok(public_keys[5] == keys[5][0], "Invalid public key 5");

  ok(
    (await public_key_from_private(
      "PVT_K1_CWCRfKc8atzthZbFMfRdFzqFqGf9d3WNAaZd99gwaosw9kfhS"
    )) == "PUB_K1_6jytfkQoZHYpzCvMZwcw8yL42KfbJ8ayncM459zii44utEy8zn",
    "Invalid public key 6"
  );
  ok(
    (await public_key_from_private(
      "PVT_K1_rpcKPJ4DbcppgK1aBVcWkgxk2VcxeVqChYK7SgQSVccBG4Do"
    )) == "PUB_K1_6Xdz1dScSbjEWm3urrwrx2BtfivTN7PpDeEsRcwM3abDuVuHox",
    "Invalid public key 7"
  );
  ok(
    (await public_key_from_private(
      "PVT_K1_2oSnUdngPUHVw3zAvNLkBeRtMZiyYRy7e4mgmgpNUgBUrvgAjA"
    )) == "PUB_K1_6VjQqy3sKmzyFCkmE8rKrKLtt3988zyo1FZnsDtjxNf4gcoeEQ",
    "Invalid public key 8"
  );
});
