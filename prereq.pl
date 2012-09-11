#!/usr/bin/perl
use strict;
use warnings;

use Term::ANSIColor qw(:constants);
$Term::ANSIColor::AUTORESET = 1;

$| = 1;

my %PREREQ;
my %MOD_PREREQ;
my $result;
my $error;

#------------------------EDIT HERE-------------------------#
$PREREQ{'node.js'} = 'node';
$PREREQ{'npm'} = 'npm';
$MOD_PREREQ{'hashish'} = 'hashish';
$MOD_PREREQ{'commander'} = 'commander';
$MOD_PREREQ{'colors'} = 'colors';
#------------------------STOP HERE-------------------------#

if (!&check_prereq(\%PREREQ)) {
    print BOLD YELLOW "\n  At least one prerequisite was not met. Please check your setup.\n";
    exit;
}

if (!&check_mod_prereq(\%MOD_PREREQ)) {
    print BOLD YELLOW "\n  At least one module could not be installed. Please check the file npm.install\n";
} else {
    print BOLD GREEN "\n All requirements are met! You can now run bin/nyssrad.\n";
}

sub check_prereq
{
    my $prereq = shift;

    foreach (keys %{$prereq}) {
        print BOLD WHITE " :: " . $_ . "...\t\t\t\t\t\t\t";
        $result = `$prereq->{$_} --version &> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            $error = 1;
        } else {
            print BOLD GREEN "found!\n";
        }
    }

    if ($error) {
        return undef;
        print BOLD YELLOW "  At least one prerequisite was not met. Please check your setup.\n";
    } else {
        return 1;
    }
}


sub check_mod_prereq
{
    my $mod_prereq = shift;

    foreach (keys %{$mod_prereq}) {
        print BOLD WHITE " :: node.js module '" . $_ . "'...\t\t\t\t\t";

        open(HANDLE, ">test.js");
        print HANDLE "require('" . $mod_prereq->{$_} . "');";
        close(HANDLE);

        $result = `node test.js 2> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            print BOLD CYAN " :: Downloading and installing " . $mod_prereq->{$_}. "...";

            $result = `npm install $mod_prereq->{$_} 2> npm.install`;

            if (${^CHILD_ERROR_NATIVE} ne 0) {
                print BOLD RED "failed!\n";
                `rm test.js`;
                return undef;
            } else {
                print BOLD GREEN "\t\tsucceeded!\n";
            }
        }
    }

    return 1;
}

