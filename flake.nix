{
  description = "Purescript flake";

  inputs = {
    flake-compat.flake = false;
    flake-compat.url = github:edolstra/flake-compat;
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "nixpkgs/nixos-unstable";
    zephyr.flake = false;
    zephyr.url = "https://github.com/MaybeJustJames/zephyr/releases/download/c074270/Linux.tar.gz";
  };

  outputs = { self, nixpkgs, flake-compat, flake-utils, zephyr }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell =
          pkgs.mkShell {
            buildInputs = with pkgs; [
              dhall
              httpie
              nixpkgs-fmt
              nodejs-16_x
              purescript
              spago
            ];
            shellHook = ''
              export LC_ALL=C
              export PATH=${zephyr}:$PATH
            '';
          };
      });
}
