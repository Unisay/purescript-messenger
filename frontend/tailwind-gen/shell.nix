let
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/21.05.tar.gz";
    })
    { };

  # To update to a newer version of easy-purescript-nix, run:
  # nix-prefetch-git https://github.com/justinwoo/easy-purescript-nix
  #
  # Then, copy the resulting rev and sha256 here.
  # Last update: 2020-08-01
  pursPkgs = import
    (pkgs.fetchFromGitHub {
      owner = "justinwoo";
      repo = "easy-purescript-nix";
      rev = "47bdc016c7d56e987ca1aca690b1d6c9816a8584";
      sha256 = "051fzxd03y0c63sll2bhn0h66dywy9lw6ylyh5vq8fymvix20q94";
    })
    { inherit pkgs; };

in
pkgs.stdenv.mkDerivation {
  name = "purescript-webpack-template";
  buildInputs = with pursPkgs; [
    pkgs.nix-prefetch-git
    pursPkgs.purs
    pursPkgs.purty
    pursPkgs.spago
    pursPkgs.zephyr
    pkgs.dhall-lsp-server
    pkgs.dhall
    pkgs.nodejs-14_x
    pkgs.nodePackages_latest.purty
    pkgs.nixpkgs-fmt
  ];
}
